import { v4 as uuidv4 } from "uuid";

const videos = [
    {
        id: uuidv4(),
        title: "Introduction to JavaScript",
        description:
            "Learn the basics of JavaScript, the most popular programming language for web development.",
        duration: "01:01",
        thumbnail:
            "https://images.unsplash.com/photo-1496715976403-7e36dc43f17b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dGh1bWJuYWlsfGVufDB8fDB8fHww",
        url: "https://res.cloudinary.com/dnljildy8/video/upload/v1746085808/klirpah9oyoivozrwfvj.mp4",
    },
    {
        id: uuidv4(),
        title: "React for Beginners",
        description:
            "A beginner-friendly guide to building user interfaces with React.",
        duration: "10:24",
        thumbnail:
            "https://images.unsplash.com/32/Mc8kW4x9Q3aRR3RkP5Im_IMG_4417.jpg?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGh1bWJuYWlsfGVufDB8fDB8fHww",
        url: "https://res.cloudinary.com/dnljildy8/video/upload/v1746086189/videoplayback_bk3m6q.mp4",
    },
    {
        id: uuidv4(),
        title: "Node.js Crash Course",
        description:
            "Get started with Node.js and learn how to build backend applications.",
        duration: "10:14",
        thumbnail:
            "https://plus.unsplash.com/premium_photo-1668116307088-583ee0d4aaf7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dGh1bWJuYWlsfGVufDB8fDB8fHww",
        url: "https://res.cloudinary.com/dnljildy8/video/upload/v1746086422/videoplayback_1_mruhuk.mp4",
    },
    {
        id: uuidv4(),
        title: "CSS Grid Layout",
        description:
            "Master CSS Grid Layout to create responsive and modern web designs.",
        duration: "04:21",
        thumbnail:
            "https://plus.unsplash.com/premium_photo-1661943659036-aa040d92ee64?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHRodW1ibmFpbHxlbnwwfHwwfHx8MA%3D%3D",
        url: "https://res.cloudinary.com/dnljildy8/video/upload/v1746085722/ln3e7d4xphzml0k9unvx.mp4",
    },
    {
        id: uuidv4(),
        title: "Understanding APIs",
        description:
            "Learn what APIs are and how to use them to fetch data for your applications.",
        duration: "06:33",
        thumbnail:
            "https://images.unsplash.com/photo-1559705421-4ae9bf6fabb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRodW1ibmFpbHxlbnwwfHwwfHx8MA%3D%3D",
        url: "https://res.cloudinary.com/dnljildy8/video/upload/v1746086345/L-1.3__Multiprogramming_and_Multitasking_Operating_System_in_Hindi_with_real_life_examples_xybbfi.mp4",
    },
];

export default videos;
