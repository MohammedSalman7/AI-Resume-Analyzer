import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaJava,
  FaGitAlt,
} from "react-icons/fa";

import {
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiExpress,
} from "react-icons/si";

const skillIcons = {
  javascript: (
    <SiJavascript className="text-yellow-400 text-4xl" />
  ),

  react: (
    <FaReact className="text-cyan-400 text-4xl" />
  ),

  "node.js": (
    <FaNodeJs className="text-green-500 text-4xl" />
  ),

  python: (
    <FaPython className="text-yellow-400 text-4xl" />
  ),

  mongodb: (
    <SiMongodb className="text-green-500 text-4xl" />
  ),

  mysql: (
    <SiMysql className="text-blue-500 text-4xl" />
  ),

  html: (
    <FaHtml5 className="text-orange-500 text-4xl" />
  ),

  css: (
    <FaCss3Alt className="text-blue-500 text-4xl" />
  ),

  java: (
    <FaJava className="text-red-500 text-4xl" />
  ),

  git: (
    <FaGitAlt className="text-orange-500 text-4xl" />
  ),

  github: (
    <FaGitAlt className="text-white text-4xl" />
  ),

  express: (
    <SiExpress className="text-gray-300 text-4xl" />
  ),

  "express.js": (
    <SiExpress className="text-gray-300 text-4xl" />
  ),

  "power bi": (
    <span className="text-4xl">📊</span>
  ),
};

function CareerRoadmap({ roadmap }) {
  if (!roadmap || Object.keys(roadmap).length === 0) {
    return null;
  }

  return (
    <div
      className="
        bg-slate-900
        rounded-3xl
        p-8
        shadow-xl
        border
        border-slate-800
      "
    >
      <h2 className="text-4xl font-bold mb-2">
        Career Roadmap
      </h2>

      <p className="text-slate-400 mb-10 text-lg">
        Learning path generated based on your
        missing skills and career goals.
      </p>

      <div
        className="
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
        "
      >
        {Object.entries(roadmap).map(
          ([skill, steps]) => (
            <div
              key={skill}
              className="
                bg-gradient-to-br
                from-slate-800
                to-slate-900
                rounded-3xl
                p-6
                border
                border-slate-700
                hover:border-blue-500
                hover:scale-[1.03]
                hover:shadow-lg
                hover:shadow-blue-500/20
                transition-all
                duration-300
              "
            >
              {/* Header */}
              <div
                className="
                  flex
                  items-center
                  gap-4
                  mb-8
                "
              >
                <div>
                  {skillIcons[
                    skill.toLowerCase()
                  ] || (
                    <span className="text-4xl">
                      📚
                    </span>
                  )}
                </div>

                <h3
                  className="
                    text-3xl
                    font-bold
                    text-blue-400
                    capitalize
                  "
                >
                  {skill}
                </h3>
              </div>

              {/* Steps */}
              <div className="space-y-5">
                {steps.map(
                  (step, index) => (
                    <div
                      key={index}
                      className="
                        flex
                        items-start
                        gap-4
                      "
                    >
                      <div
                        className="
                          w-10
                          h-10
                          rounded-full
                          bg-blue-600
                          flex
                          items-center
                          justify-center
                          font-bold
                          text-white
                          shrink-0
                        "
                      >
                        {index + 1}
                      </div>

                      <p
                        className="
                          text-slate-300
                          text-lg
                          leading-relaxed
                        "
                      >
                        {step}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default CareerRoadmap;