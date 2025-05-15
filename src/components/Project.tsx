import projectItems from "@/constants/projectItems";

export default function Project() {
  return (
    <div className="flex flex-col items-center py-[9rem] bg-gray-100">
      <h1 className="font-black text-[5rem] pb-[2rem] mb-[6rem] border-b-[0.2rem] border-gray-400">
        PROJECTS
      </h1>
      <div>
        {projectItems &&
          projectItems.map((projectItem) => (
            <div key={projectItem.id}>{projectItem.title}</div>
          ))}
      </div>
    </div>
  );
}
