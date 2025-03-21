import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TaskInput } from "../../components/Input";
import { Button } from "../../components/Button";
import { db, collection, addDoc } from "../../firebase";

export const AddTodoList = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState({
    heading: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add task to Firestore
      await addDoc(collection(db, "tasks"), {
        heading: task.heading,
        description: task.description,
        createdAt: new Date(),
      });

      // Navigate to the todo list page after adding the task
      navigate("/");
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const isFormValid =
    task.heading.trim() !== "" && task.description.trim() !== "";

  return (
    <div className="m-12 rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Add New Task</h2>
      <form onSubmit={handleSubmit}>
        {/* Heading Input */}
        <TaskInput
          name="heading"
          label="Heading"
          value={task.heading}
          onChange={handleInputChange}
          placeholder="Please Input Heading"
        />
        {/* Description Input */}
        <TaskInput
          name="description"
          label="Description"
          value={task.description}
          onChange={handleInputChange}
          placeholder="Please Input Description"
        />
        {/* Buttons */}
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
            message="Save"
            disabled={!isFormValid}
          />
        </div>
      </form>
    </div>
  );
};
