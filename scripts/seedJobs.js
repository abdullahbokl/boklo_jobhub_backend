import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import UserModel from "../src/models/userModel.js";
import JobModel from "../src/models/jobModel.js";

const contractTypes = ["full-time", "part-time", "contract"];
const workPeriods = ["Monthly", "Monthly", "Monthly", "Weekly"];
const companies = [
  "Boklo Tech",
  "Nile Stack",
  "Atlas Labs",
  "Delta Systems",
  "Remote Forge",
  "Launchpad Studio",
  "Vertex Cloud",
  "Bright Path AI",
  "Cedar Works",
  "Blue Harbor Digital",
];
const locations = [
  "Cairo, Egypt",
  "Alexandria, Egypt",
  "Giza, Egypt",
  "Mansoura, Egypt",
  "Remote",
  "Cairo, Egypt (Remote)",
  "Dubai, UAE (Remote)",
  "Riyadh, Saudi Arabia",
  "Amman, Jordan",
  "Istanbul, Turkey (Remote)",
];
const titles = [
  "Flutter Developer",
  "Senior Flutter Developer",
  "Backend Engineer",
  "Frontend Engineer",
  "Full Stack Developer",
  "QA Engineer",
  "DevOps Engineer",
  "UI/UX Designer",
  "Product Designer",
  "Product Manager",
  "Data Analyst",
  "Mobile QA Specialist",
  "Node.js Developer",
  "React Developer",
  "Technical Support Engineer",
  "Customer Success Specialist",
  "Growth Marketing Specialist",
  "Project Coordinator",
  "Business Analyst",
  "AI Integration Engineer",
];
const images = [
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1519389950473-acc755a6a097?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=60",
];
const requirementPool = [
  "Strong communication skills",
  "Experience working in agile teams",
  "Ability to write clean, maintainable code",
  "Comfort with remote collaboration tools",
  "Problem-solving mindset",
  "Ability to own features end to end",
  "Experience with REST APIs",
  "Attention to detail",
  "Testing and debugging skills",
  "Willingness to learn quickly",
  "Performance optimization awareness",
  "Version control using Git",
];

function getSalaryRange(index, contractType) {
  const base = 900 + (index % 10) * 350;

  if (contractType === "part-time") {
    const min = base;
    const max = base + 700;
    return `$${min} - $${max}`;
  }

  if (contractType === "contract") {
    const min = base + 1200;
    const max = min + 1800;
    return `$${min} - $${max}`;
  }

  const min = base + 1800;
  const max = min + 2200;
  return `$${min} - $${max}`;
}

function getRequirements(index) {
  const first = requirementPool[index % requirementPool.length];
  const second = requirementPool[(index + 3) % requirementPool.length];
  const third = requirementPool[(index + 6) % requirementPool.length];
  const fourth = requirementPool[(index + 9) % requirementPool.length];
  return [first, second, third, fourth];
}

function buildJob(index) {
  const contract = contractTypes[index % contractTypes.length];
  const title = titles[index % titles.length];
  const company = companies[index % companies.length];
  const location = locations[index % locations.length];
  const period = workPeriods[index % workPeriods.length];

  return {
    title: `${title} ${index + 1}`,
    description:
      `${company} is hiring a ${title.toLowerCase()} to help deliver reliable digital products. ` +
      `You will collaborate with cross-functional teammates, ship customer-facing features, and improve product quality through practical execution.`,
    location,
    salary: getSalaryRange(index, contract),
    company,
    period,
    contract,
    requirements: getRequirements(index),
    imageUrl: images[index % images.length],
  };
}

function parseCount() {
  const rawCount = process.argv[2];
  const parsed = Number.parseInt(rawCount ?? "60", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 60;
}

function shouldClearExistingJobs() {
  return process.argv.includes("--reset");
}

function buildJobs(count, startIndex = 0) {
  return Array.from({ length: count }, (_, index) => buildJob(startIndex + index));
}

async function seed() {
  try {
    const mongoUrl = process.env.MONGO_URL;
    const dbName = process.env.MONGO_DB_NAME;

    console.log(`Connecting to: ${mongoUrl}${dbName}`);
    await mongoose.connect(mongoUrl, { dbName });
    console.log("Database connected!");

    let agent = await UserModel.findOne({ email: "agent@boklo.com" });
    if (!agent) {
      console.log("Creating default agent...");
      const hashedPassword = await bcrypt.hash("password123", 10);
      agent = await UserModel.create({
        userName: "BokloAgent",
        email: "agent@boklo.com",
        password: hashedPassword,
        role: "company",
        companyName: "Boklo Tech",
        isAgent: true,
        fullName: "Boklo Recruitment Agent",
        location: "Cairo, Egypt",
      });
      console.log("Agent created.");
    }

    const requestedCount = parseCount();
    const reset = shouldClearExistingJobs();
    const existingJobsCount = await JobModel.countDocuments();

    if (reset) {
      await JobModel.deleteMany({});
      console.log("Old jobs cleared.");
    }

    const jobs = buildJobs(requestedCount, reset ? 0 : existingJobsCount);
    const jobsWithAgent = jobs.map((job) => ({
      ...job,
      agentId: agent._id,
    }));

    await JobModel.insertMany(jobsWithAgent);
    console.log(
      `Successfully ${reset ? "seeded" : "appended"} ${jobs.length} jobs. Total before insert: ${existingJobsCount}.`,
    );

    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
