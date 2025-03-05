import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TaskInput } from "../../components/Input";
import { Button } from "../../components/Button";

export const EditTodoList = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get task ID from URL
  const [task, setTask] = useState({
    heading: "",
    description: "",
    createdAt: 0
  });

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const existingTask = tasks.find(t => t.id === Number(id)); // Convert to number
    
    if (existingTask) {
      setTask({
        heading: existingTask.heading,
        description: existingTask.description,
        createdAt: existingTask.createdAt
      });
    } else {
      navigate("/", { replace: true });
    }
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
    const updatedTasks = tasks.map(t => 
      t.id === Number(id) ? { 
        ...t,
        heading: task.heading,
        description: task.description,
      } : t
    );

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    navigate("/");
  };

  const isFormValid =
    task.heading.trim() !== "" && task.description.trim() !== "";

  return (
    <div className="m-12 rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <TaskInput
          name="heading"
          label="Heading"
          value={task.heading}
          onChange={handleInputChange}
          placeholder="Please Input Heading"
        />
        <TaskInput
          name="description"
          label="Description"
          value={task.description}
          onChange={handleInputChange}
          placeholder="Please Input Description"
        />
        <div className="flex justify-end gap-2">
          <Button
            type="button"
            color="red"
            message="Cancel"
            onClick={() => navigate("/")}
          />
          <Button
            type="submit"
            color="green"
            message="Save Changes"
            disabled={!isFormValid}
          />
        </div>
      </form>
    </div>
  );
};