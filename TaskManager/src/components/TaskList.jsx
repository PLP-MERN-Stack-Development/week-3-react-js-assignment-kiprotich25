import TaskCard from "@/components/TaskCard";

export default function TaskList({tasks}){
    if (tasks.length === 0){
        return <p className="text-gray-500">No tasks found</p>
    }
    return (
        <div className="space-y-4 flex">
            {tasks.map((t,i) =>(
                <TaskCard
                key={t.id}
                index={i}
                />
            ))}
        </div>
    )
}