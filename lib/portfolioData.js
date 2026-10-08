const portfolioData = {
  personal: {
    name: "Shashanka Luitel",
    title: "Computer Engineer",
    location: "Bhaktapur, Nepal",

    description:
      "Shashanka Luitel is a Computer Engineering graduate from Kathmandu University with a work experience in full-stack software development. He is currently interested in Human-Computer Interaction, Extended Reality, Human-AI Interaction, and interactive systems.",

    interests: [
      "Human-Computer Interaction",
      "Extended Reality (XR)",
      "Human-AI Interaction",
      "Interactive Visualization",
      "Human-Centered AI",
    ],

    personalInterests: [
      "Trekking and hiking",
      "Exploring Nepal and beyond",
      "Building fun projects",
      "Technology and software development",
      "Movies, TV series, and anime",
      "Sports",
      "Music and Gaming",
      "Riding motorcycles and driving cars",
    ],
  },

  education: [
    {
      degree: "Bachelor's Degree in Computer Engineering",
      institution: "Kathmandu University",
      location: "Nepal",
      period: "December 2020 - August 2025",
      cgpa: "3.69/4.00",
    },

    {
      degree: "+2 with Physics and Computer Major",
      institution: "DAV College, Jawalakhel",
      location: "Nepal",
      period: "2018 - 2020",
      cgpa: "3.76/4.00",
    },

    {
      degree: "Secondary Education Examination",
      institution: "CVM Secondary School, Bhaktapur",
      location: "Nepal",
      period: "2018",
      cgpa: "3.80/4.00",
    },
  ],

  experience: {
    company: "Citytech",
    location: "Kamaladi, Kathmandu, Nepal",
    overallRole: "Software Engineer",
    period: "April 2025 - December 2025",

    description:
      "Shashanka worked at Citytech, a fintech company in Kathmandu, contributing to full-stack development for a remittance product and its administration portal.",

    roles: [
      {
        title: "Software Engineer Trainee",
        period: "July 2025 - December 2025",
        responsibilities: [
          "Worked as a full-stack developer on a remittance product and its administration portal.",
          "Developed and maintained features using React.js, Node.js, and Microsoft SQL Server.",
          "Collaborated with team members to add new features and improve existing functionality.",
        ],
      },

      {
        title: "Software Engineer Intern",
        period: "April 2025 - July 2025",
        responsibilities: [
          "Worked mainly on frontend development and debugging using React.js.",
          "Gained hands-on experience with backend APIs and database integration.",
        ],
      },
    ],

    technologies: [
      "React",
      "Redux",
      "Redux Toolkit",
      "Ant Design",
      "Node.js",
      "Express",
      "REST APIs",
      "Microsoft SQL Server",
      "MongoDB",
      "Redis",
      "Socket.IO",
      "Server-Sent Events",
      "Git",
      "Bitbucket",
      "Jira",
      "Postman",
      "Swagger",
      "DataGrip",
    ],
  },

  research: {
    interests: [
      "Human-Computer Interaction",
      "Human-AI Interaction",
      "Extended Reality",
      "Augmented Reality",
      "Virtual Reality",
      "Interactive Visualization",
      "Human-Centered AI",
      "Interactive Systems",
    ],

    direction:
      "Shashanka is particularly interested in exploring how immersive and interactive technologies can help people understand complex information, perform tasks more effectively, and interact with intelligent systems.",

    work: [
      {
        title: "Digital Health in Nepal: Past, Current and Future Scenarios",
        type: "Research Work",
        description:
          "A paper exploring the evolution of digital health in Nepal, from early systems such as the Health Management Information System to more recent implementations such as IHIMS and DHIS2.",
        link: "https://www.researchgate.net/publication/401330627_Digital_Health_in_Nepal_Past_Current_and_Future_Scenarios",
      },

      {
        title: "Ethics of Modern Media Provocation",
        type: "Research Work",
        description:
          "A study examining the ethical implications of modern media provocation, with a focus on rage-baiting and how sensationalized and divisive content can be used to increase engagement on digital platforms.",
        link: "https://www.researchgate.net/publication/401331932_Ethics_of_Modern_Media_Provocation",
      },
    ],

    note: "These research works should not be interpreted as evidence of a large-scale publication record. Shashanka's current primary research interests are HCI, XR, human-AI interaction, and interactive systems.",
  },

  projects: [
    {
      name: "MindSense",
      category: "Machine Learning / Web Application",
      description:
        "A machine learning-based web application that predicts a mental wellness score using users' digital habits, lifestyle, and academic factors.",

      details:
        "The application provides an interactive assessment and generates a data-driven prediction using a trained machine learning model. It explores factors such as social media use, sleep, study, physical activity, and stress.",

      technologies: [
        "Next.js",
        "React",
        "Tailwind CSS",
        "FastAPI",
        "Python",
        "Machine Learning",
      ],

      links: {
        demo: "https://mental-health-prediction-lac.vercel.app/",
        github: "https://github.com/Shashanka10/mental-health-prediction",
      },

      note: "MindSense is an exploratory project and is not a medical diagnostic tool.",
    },

    {
      name: "Trek Diaries",
      category: "Full-Stack Web Application",
      description:
        "A social platform designed for trekking and hiking enthusiasts to explore locations, connect with other users, and share experiences through posts, likes, and comments.",

      links: {
        demo: "https://trek-diaries-pink.vercel.app/",
        github: "https://github.com/Re-Dye/Trek-Diaries",
      },
    },

    {
      name: "Trek Diaries Mobile App",
      category: "Mobile Application",
      description:
        "A mobile version of Trek Diaries designed for trekking and hiking enthusiasts to explore locations, connect with others, and share experiences.",

      links: {
        github: "https://github.com/Re-Dye/Trek-Diaries-Mobile",
      },
    },

    {
      name: "Flight Delay Data Visualization",
      category: "Data Visualization",
      description:
        "A data visualization project that explores flight delay data to identify patterns, trends, and factors associated with airline delays.",

      technologies: ["Python", "Streamlit", "Data Visualization"],

      links: {
        demo: "https://flight-delay-data.streamlit.app/",
        github: "https://github.com/bijayy11/Flight-Delay-Data-visualization",
      },
    },

    {
      name: "Battleship",
      category: "Game Development",
      description:
        "A browser-based multiplayer Battleship game where players strategically locate and attack an opponent's hidden fleet.",

      links: {
        demo: "https://battleship-io.onrender.com",
        github: "https://github.com/Re-Dye/Battleship",
      },
    },

    {
      name: "Chat Message",
      category: "Real-Time Application",
      description:
        "A real-time chat application called chat-JPT, developed to enable continuous communication between users.",

      technologies: ["Node.js", "Socket.IO"],

      links: {
        github: "https://github.com/Re-Dye/chat-JPT",
      },
    },

    {
      name: "Gas Leakage Detection System",
      category: "Embedded / IoT Project",
      description:
        "A gas leakage detection system that uses a gas sensor to detect leaks and provides an audible alarm, LCD warning message, and LED indicator.",

      links: {
        github: "https://github.com/Shashanka10/Gas_Leak_Detection_System",
      },
    },

    {
      name: "Roller Ball",
      category: "Game Development",
      description:
        "An action-oriented ball game where the player collects pickups to score points while avoiding enemies.",

      technologies: ["Unity", "Game Development"],

      links: {
        demo: "https://shashanka10.itch.io/roller-baller",
        github: "https://github.com/Shashanka10/RollerBall",
      },
    },

    {
      name: "Maze Runner 2D Simulation Game",
      category: "Game Development",
      description:
        "A 2D simulation car game in which the player drives through a complex maze to reach the finish line.",

      technologies: ["Python", "Pygame", "PyOpenGL"],

      links: {
        github: "https://github.com/5Asim/OpenGL-Project",
      },
    },
  ],

  skills: {
    frontend: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Ant Design",
      "Redux",
      "Redux Toolkit",
      "React Native",
      "Expo",
    ],

    backend: [
      "Node.js",
      "Express",
      "FastAPI",
      "REST APIs",
      "Socket Programming",
    ],

    programming: ["JavaScript", "TypeScript", "Python"],

    databases: [
      "MySQL",
      "PostgreSQL",
      "Microsoft SQL Server",
      "MongoDB",
      "Redis",
      "Firebase",
      "Appwrite",
    ],

    tools: [
      "Git",
      "Docker",
      "Postman",
      "Swagger",
      "DataGrip",
      "Bitbucket",
      "Jira",
    ],
  },

  extracurricular: [
    {
      organization: "IT MEET 2024",
      role: "Developer Lead",
      period: "July 2024 - December 2024",
      description:
        "Led a team of developers working on the official IT MEET 2024 website, coordinating development tasks and contributing to the technical direction of the project.",
    },

    {
      organization: "Microsoft Learn Student Ambassadors",
      role: "Beta Microsoft Student Ambassador",
      period: "November 2023 - March 2025",
      description:
        "Participated in the Microsoft Learn Student Ambassador program and conducted workshops in schools to help students develop early coding skills and engage with technology.",
    },

    {
      organization: "KU Hackfest 2023",
      role: "Graphic Designer",
      period: "September 2023 - October 2023",
      description:
        "Contributed to the design of templates, social media posts, prospectus materials, posters, and certificates for KU Hackfest 2023.",
    },

    {
      organization: "IT Express 2022",
      role: "Graphic Designer",
      period: "November 2022",
      description:
        "Contributed design work to the IT Express journal published by the Kathmandu University Computer Club.",
    },
  ],

  goals: {
    graduateStudy:
      "Shashanka is interested in pursuing graduate study and research in Human-Computer Interaction, Extended Reality, Human-AI Interaction, and interactive systems.",

    longTerm:
      "His long-term goal is to contribute to research and development of human-centered interactive technologies.",
  },
};

export default portfolioData;
