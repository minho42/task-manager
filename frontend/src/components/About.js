import React from "react";

const About = () => {
  return (
    <div className="space-y-3">
      <div className="bg-gradient-to-r from-blue-700 to-blue-400 py-8 text-center">
        <div className="text-3xl font-semibold leading-snug text-white">
          React frontend for task-manager from
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
        <a className="underline" href="https://github.com/minho42/" target="_blank" rel="noopener noreferrer">
          github
        </a>
      </div>
    </div>
  );
};

export default About;
