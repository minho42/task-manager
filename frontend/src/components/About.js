import React from "react";

const About = () => {
  return (
    <div className="space-y-3">
      <div className="flex justify-center  bg-gradient-to-r from-blue-700 to-blue-400 py-8 text-center">
        <div className="flex flex-col justify-center max-w-lg w-full text-2xl font-semibold leading-snug text-white">
          React frontend with JWT authentication for
          <a
            className="underline text-blue-100 block"
            href="https://github.com/andrewjmead/node-course-v3-code/tree/master/task-manager"
            target="_blank"
            rel="noopener noreferrer"
          >
            The Complete Node.js Developer Course
          </a>
        </div>
      </div>
      <div className="text-center">
        <a
          className="underline"
          href="https://github.com/minho42/task-manager"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
      </div>
    </div>
  );
};

export default About;
