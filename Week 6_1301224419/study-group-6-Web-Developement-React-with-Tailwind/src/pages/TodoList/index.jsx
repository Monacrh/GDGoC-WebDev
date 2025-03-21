import { Card } from "../../components/Card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, collection, getDocs, deleteDoc, doc } from "../../firebase";

export const TodoList = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "tasks"));
        const tasks = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Firestore document ID
          ...doc.data(),
        }));

        setList(tasks);
      } catch (error) {
        console.error("Error fetching tasks: ", error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "tasks", id)); // Delete from Firestore

      const updatedList = list.filter((item) => item.id !== id);
      setList(updatedList);
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  return (
    <div className="m-12">
      <div className="flex justify-between gap-3 px-2 py-3">
        <p className="font-bold lg:text-3xl">TodoList App</p>
        <button
          className="rounded-lg bg-green-500 px-8 py-2 font-medium text-white hover:bg-green-600"
          onClick={() => navigate("/add")}
        >
          Add
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {list.map((task) => (
          <Card
            id={task.id}
            key={task.id}
            heading={task.heading}
            description={task.description}
            createdAt={task.createdAt}
            onDelete={() => handleDelete(task.id)}
            onEdit={() => navigate(`/edit/${task.id}`)}
          />
        ))}
      </div>
    </div>
  );
};
