"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { MessageCircle } from "lucide-react";

interface Task {
  id: string;
  content: string;
  description: string;
  dueDate: string;
}

interface TaskState {
  todo: Task[];
  inProgress: Task[];
  done: Task[];
}

const initialTasks: TaskState = {
  todo: [
    {
      id: "task-1",
      content: "Write a clear pitch",
      description: "Jane says: Focus on your impact",
      dueDate: "Apr 1, 2025"
    },
    {
      id: "task-2",
      content: "Prepare your budget",
      description: "Keep it simple and realistic",
      dueDate: "Apr 1, 2025"
    }
  ],
  inProgress: [],
  done: []
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3 }
  }
};

const columnVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4 }
  }
};

export default function ProgressPage() {
  const [tasks, setTasks] = useState<TaskState>(initialTasks);
  const [completedSteps, setCompletedSteps] = useState(2);
  const totalSteps = 5;

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // If dropped outside a droppable area
    if (!destination) return;

    // If dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Create a copy of the source list
    const sourceList = Array.from(tasks[source.droppableId as keyof TaskState]);
    const [removed] = sourceList.splice(source.index, 1);

    // Create a copy of the destination list
    const destinationList = source.droppableId === destination.droppableId
      ? sourceList
      : Array.from(tasks[destination.droppableId as keyof TaskState]);

    // Add the item to the destination list
    destinationList.splice(destination.index, 0, removed);

    // Update the state with new lists
    setTasks(prev => ({
      ...prev,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destinationList
    }));

    // Update completed steps
    if (destination.droppableId === "done") {
      setCompletedSteps(prev => Math.min(prev + 1, totalSteps));
    } else if (source.droppableId === "done") {
      setCompletedSteps(prev => Math.max(prev - 1, 0));
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gray-50"
    >
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={containerVariants}
          className="mb-8"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-3xl font-bold text-gray-900"
          >
            Faire Grant - $5,000
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-gray-600 mt-2"
          >
            Tips to win, from winners
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="mt-4"
          >
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span className="ml-auto">{completedSteps} of {totalSteps} steps completed</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(completedSteps / totalSteps) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="h-2 bg-blue-600 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>

        <DragDropContext onDragEnd={onDragEnd}>
          <motion.div 
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* To Do Column */}
            <Droppable droppableId="todo" isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false}>
              {(provided, snapshot) => (
                <motion.div
                  variants={columnVariants}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`bg-white rounded-xl p-4 shadow-sm min-h-[200px] ${
                    snapshot.isDraggingOver ? "bg-gray-50" : ""
                  }`}
                >
                  <motion.h2 
                    variants={itemVariants}
                    className="text-lg font-semibold text-gray-900 mb-4"
                  >
                    To Do
                  </motion.h2>
                  <AnimatePresence>
                    <div className="space-y-3">
                      {tasks.todo.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`bg-white rounded-lg border p-4 ${
                                snapshot.isDragging ? "shadow-lg" : ""
                              }`}
                            >
                              <div 
                                {...provided.dragHandleProps}
                                className="flex items-start gap-3"
                              >
                                <div className="flex-1">
                                  <h3 className="font-medium text-gray-900">{task.content}</h3>
                                  <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                                  <div className="flex items-center mt-2 text-xs text-gray-500">
                                    <span>Due {task.dueDate}</span>
                                  </div>
                                </div>
                                <input
                                  type="checkbox"
                                  className="mt-1.5 h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-600"
                                />
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </AnimatePresence>
                </motion.div>
              )}
            </Droppable>

            {/* In Progress Column */}
            <Droppable droppableId="inProgress" isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false}>
              {(provided, snapshot) => (
                <motion.div
                  variants={columnVariants}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`bg-white rounded-xl p-4 shadow-sm min-h-[200px] ${
                    snapshot.isDraggingOver ? "bg-gray-50" : ""
                  }`}
                >
                  <motion.h2 
                    variants={itemVariants}
                    className="text-lg font-semibold text-gray-900 mb-4"
                  >
                    In Progress
                  </motion.h2>
                  <AnimatePresence>
                    <div className="space-y-3">
                      {tasks.inProgress.length === 0 && !snapshot.isDraggingOver && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="border-2 border-dashed border-gray-200 rounded-lg p-4"
                        >
                          <p className="text-center text-gray-400">Drag cards here</p>
                        </motion.div>
                      )}
                      {tasks.inProgress.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`bg-white rounded-lg border p-4 ${
                                snapshot.isDragging ? "shadow-lg" : ""
                              }`}
                            >
                              <div 
                                {...provided.dragHandleProps}
                                className="flex flex-col"
                              >
                                <h3 className="font-medium text-gray-900">{task.content}</h3>
                                <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                                <div className="flex items-center mt-2 text-xs text-gray-500">
                                  <span>Due {task.dueDate}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </AnimatePresence>
                </motion.div>
              )}
            </Droppable>

            {/* Done Column */}
            <Droppable droppableId="done" isDropDisabled={false} isCombineEnabled={false} ignoreContainerClipping={false}>
              {(provided, snapshot) => (
                <motion.div
                  variants={columnVariants}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`bg-white rounded-xl p-4 shadow-sm min-h-[200px] ${
                    snapshot.isDraggingOver ? "bg-gray-50" : ""
                  }`}
                >
                  <motion.h2 
                    variants={itemVariants}
                    className="text-lg font-semibold text-gray-900 mb-4"
                  >
                    Done
                  </motion.h2>
                  <AnimatePresence>
                    <div className="space-y-3">
                      {tasks.done.length === 0 && !snapshot.isDraggingOver && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="border-2 border-dashed border-gray-200 rounded-lg p-4"
                        >
                          <p className="text-center text-gray-400">Drag completed cards here</p>
                        </motion.div>
                      )}
                      {tasks.done.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`bg-white rounded-lg border p-4 ${
                                snapshot.isDragging ? "shadow-lg" : ""
                              }`}
                            >
                              <div 
                                {...provided.dragHandleProps}
                                className="flex flex-col"
                              >
                                <h3 className="font-medium text-gray-900">{task.content}</h3>
                                <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                                <div className="flex items-center mt-2 text-xs text-gray-500">
                                  <span>Due {task.dueDate}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </AnimatePresence>
                </motion.div>
              )}
            </Droppable>
          </motion.div>
        </DragDropContext>
        <motion.div 
          variants={containerVariants}
          className="mt-8 flex justify-between"
        >
          <div className="flex gap-4">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700"
            >
              Go to Faire's Site
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 text-sm font-medium text-orange-600 border border-orange-600 rounded-md hover:bg-orange-50"
            >
              Save Progress
            </motion.button>
          </div>
        </motion.div>

        {/* Ask Your Mentor Section */}
        <motion.div
          variants={containerVariants}
          className="mt-12 bg-white rounded-xl p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Ask Your Mentor</h2>
          
          <div className="flex items-start gap-4 mb-4">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Mentor"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">Jane - Won this grant</h3>
              <p className="text-xs text-gray-500 mb-2">Available now</p>
              <button className="inline-flex items-center gap-1.5 text-xs text-orange-600  font-medium">
                <MessageCircle className="w-4 h-4" />
                Message
              </button>
            </div>
          </div>

          <div className="border-gray-100 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700 mb-4">Ask: How do I budget for this grant?</p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 text-gray-900 rounded-lg border border-gray-200 px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-orange-600"
              />
              <button className="bg-orange-600 text-white p-1.5 rounded-lg hover:bg-orange-700">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>

       
      </div>
    </motion.div>
  );
} 