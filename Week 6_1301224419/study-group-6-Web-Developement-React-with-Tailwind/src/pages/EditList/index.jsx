import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TaskInput } from "../../components/Input";
import { Button } from "../../components/Button";
import { db, doc, getDoc, updateDoc } from "../../firebase"; // Import Firestore functions

export const EditTodoList = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get task ID from URL
  const [task, setTask] = useState({
    heading: "",
    description: "",
    createdAt: 0
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const taskRef = doc(db, "tasks", id); // Reference to Firestore document
        const taskSnap = await getDoc(taskRef); // Get the task document

        if (taskSnap.exists()) {
          setTask(taskSnap.data()); // Set task data from Firestore
        } else {
          navigate("/", { replace: true }); // Redirect if task doesn't exist
        }
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [id, navigate]);

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
      const taskRef = doc(db, "tasks", id); // Reference to Firestore document
      await updateDoc(taskRef, {
        heading: task.heading,
        description: task.description,
        updatedAt: new Date(),
      });

      navigate("/"); // Redirect to the todo list
    } catch (error) {
      console.error("Error updating task:", error);
    }
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
