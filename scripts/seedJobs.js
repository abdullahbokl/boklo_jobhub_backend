import "dotenv/config";
import mongoose from "mongoose";
import UserModel from "../src/models/userModel.js";
import JobModel from "../src/models/jobModel.js";
import bcrypt from "bcryptjs";

const jobs = [
    {
        title: "Senior Flutter Developer",
        description: "We are looking for an experienced Flutter developer to join our mobile team. You will be responsible for building high-quality, performant mobile applications for both iOS and Android platforms.",
        location: "Cairo, Egypt (Remote)",
        salary: "$2500 - $4000",
        company: "Boklo Tech",
        period: "Monthly",
        contract: "Full-time",
        requirements: ["3+ years of Flutter experience", "State Management (Bloc/Cubit)", "Dart programming expertise", "Familiarity with Firebase"],
        imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
        title: "Backend Engineer (Node.js)",
        description: "Join our core platform team to build scalable APIs and microservices. You will work with Node.js, Express, and MongoDB to deliver high-performance backend systems.",
        location: "Alexandria, Egypt",
        salary: "$1800 - $3000",
        company: "Innovate Hub",
        period: "Monthly",
        contract: "Full-time",
        requirements: ["Proficiency in Node.js & Express", "MongoDB & Mongoose knowledge", "RESTful API design", "Experience with AWS"],
        imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
        title: "UI/UX Designer",
        description: "Create beautiful and intuitive user experiences for our enterprise products. You will work closely with developers to bring designs to life.",
        location: "Giza, Egypt",
        salary: "$1200 - $2200",
        company: "Design Masters",
        period: "Monthly",
        contract: "Contract",
        requirements: ["Figma proficiency", "Strong portfolio of mobile & web apps", "Understanding of design systems", "User research experience"],
        imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
        title: "Junior Frontend Developer",
        description: "Exciting opportunity for a fresh graduate to start their career in web development using React and modern frontend tools.",
        location: "Remote",
        salary: "$800 - $1200",
        company: "Startup Co",
        period: "Monthly",
        contract: "Full-time",
        requirements: ["HTML/CSS/JS knowledge", "React basics", "Passion for learning", "Good team player"],
        imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    },
    {
        title: "Product Manager",
        description: "Define the product vision and roadmap. You will act as the bridge between business goals and technical execution.",
        location: "New Cairo, Egypt",
        salary: "$3000 - $5000",
        company: "Global Logistics",
        period: "Monthly",
        contract: "Full-time",
        requirements: ["5+ years product management experience", "Agile/Scrum certification", "Strong leadership skills", "Data-driven mindset"],
        imageUrl: "https://images.unsplash.com/photo-1519389950473-acc755a6a097?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
    }
];

async function seed() {
    try {
        const mongoUrl = process.env.MONGO_URL;
        const dbName = process.env.MONGO_DB_NAME;

        console.log(`Connecting to: ${mongoUrl}${dbName}`);
        await mongoose.connect(mongoUrl, { dbName });
        console.log("Database connected!");

        // 1. Create Default Agent
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
                location: "Cairo, Egypt"
            });

            console.log("Agent created.");
        }

        // 2. Clear existing jobs (Optional, but good for a fresh start)
        await JobModel.deleteMany({});
        console.log("Old jobs cleared.");

        // 3. Insert new jobs
        const jobsWithAgent = jobs.map(job => ({
            ...job,
            agentId: agent._id
        }));

        await JobModel.insertMany(jobsWithAgent);
        console.log(`Successfully seeded ${jobs.length} jobs!`);

        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
}

seed();
