"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSun,
  FiMoon,
  FiCalendar,
  FiClock,
  FiCheck,
  FiList,
  FiAlertCircle,
  FiCheckCircle,
  FiPlus,
  FiFilter,
  FiTrash2,
  FiEdit,
  FiAward,
  FiTrendingUp,
} from "react-icons/fi";
import confetti from "canvas-confetti";

const TaskManager = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  const [filterStatus, setFilterStatus] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showMotivationalQuote, setShowMotivationalQuote] = useState(false);
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          {
            id: 1,
            status: "قيد التنفيذ",
            task: "إنهاء تقرير المشروع",
            date: "2024-07-15",
            deadline: "2024-07-20",
            state: "عاجل",
            notes: "يجب مراجعة الأرقام",
            completed: false,
            project: "تطوير المنتج",
            goal: "زيادة المبيعات",
            lifeAspect: "العمل",
          },
          {
            id: 2,
            status: "مكتمل",
            task: "اجتماع مع العملاء",
            date: "2024-07-16",
            deadline: "2024-07-16",
            state: "عادي",
            notes: "تحضير العرض التقديمي",
            completed: true,
            project: "خدمة العملاء",
            goal: "تحسين رضا العملاء",
            lifeAspect: "المهنة",
          },
          {
            id: 3,
            status: "معلق",
            task: "تحديث قاعدة البيانات",
            date: "2024-07-17",
            deadline: "2024-07-25",
            state: "غير عاجل",
            notes: "التنسيق مع فريق تكنولوجيا المعلومات",
            completed: false,
            project: "تحديث البنية التحتية",
            goal: "تحسين الأداء",
            lifeAspect: "التطوير الذاتي",
          },
        ];
  });

  const [newTask, setNewTask] = useState({
    task: "",
    deadline: "",
    state: "عادي",
    notes: "",
    project: "",
    goal: "",
    lifeAspect: "",
  });

  const tabs = useMemo(
    () => [
      { id: "all", label: "كل المهام", icon: <FiList /> },
      { id: "tomorrow", label: "مهام الغد", icon: <FiSun /> },
      { id: "week", label: "مهام الأسبوع", icon: <FiCalendar /> },
      { id: "postponed", label: "مهام مؤجلة", icon: <FiClock /> },
      { id: "completed", label: "مهام مكتملة", icon: <FiCheck /> },
      { id: "nodate", label: "بدون تاريخ", icon: <FiMoon /> },
    ],
    []
  );

  const motivationalQuotes = useMemo(
    () => [
      "كل إنجاز يبدأ بقرار المحاولة.",
      "النجاح هو مجموع الجهود الصغيرة المتكررة يومًا بعد يوم.",
      "لا تؤجل عمل اليوم إلى الغد.",
      "الإنتاجية ليست عن إدارة وقتك، بل عن إدارة طاقتك.",
      "ابدأ من حيث أنت. استخدم ما لديك. افعل ما تستطيع.",
    ],
    []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("darkMode", darkMode);
    document.body.style.transition = "background-color 0.5s ease";
    document.body.className = darkMode ? "dark" : "";
  }, [tasks, darkMode]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  const toggleTaskCompletion = useCallback((taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const newCompleted = !task.completed;
          if (newCompleted) {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
            });
          }
          return {
            ...task,
            completed: newCompleted,
            status: newCompleted ? "مكتمل" : "قيد التنفيذ",
          };
        }
        return task;
      })
    );
  }, []);

  const deleteTask = useCallback((taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  const startEditTask = useCallback((task) => {
    setEditingTask(task);
  }, []);

  const updateTask = useCallback((updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
  }, []);

  const updateTaskField = useCallback((taskId, field, value) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, [field]: value } : task
      )
    );
  }, []);

  const handleNewTaskChange = useCallback((e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  }, []);

  const addNewTaskFromTable = useCallback(() => {
    if (!newTask.task) return; // Prevent adding empty tasks
    const taskToAdd = {
      id: Date.now(),
      status: "قيد التنفيذ",
      date: new Date().toISOString().split("T")[0],
      completed: false,
      ...newTask,
    };
    setTasks((prevTasks) => [...prevTasks, taskToAdd]);
    setNewTask({
      task: "",
      deadline: "",
      state: "عادي",
      notes: "",
      project: "",
      goal: "",
      lifeAspect: "",
    });
  }, [newTask]);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (filterStatus === "all") return true;
        if (filterStatus === "completed") return task.completed;
        if (filterStatus === "active") return !task.completed;
        return task.status === filterStatus;
      })
      .filter(
        (task) =>
          task.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.notes.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [tasks, filterStatus, searchTerm]);

  const completedTasksCount = useMemo(
    () => tasks.filter((task) => task.completed).length,
    [tasks]
  );

  return (
    <div
      dir="rtl"
      className={`min-h-screen ${
        darkMode ? "dark" : ""
      } transition-colors duration-300`}
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header and Dark Mode Toggle */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">مدير المهام</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowMotivationalQuote(!showMotivationalQuote)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-400 transition-colors duration-300"
            >
              <FiAward className="w-6 h-6" />
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-400 transition-colors duration-300"
            >
              {darkMode ? (
                <FiSun className="w-6 h-6" />
              ) : (
                <FiMoon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Motivational Quote */}
        <AnimatePresence>
          {showMotivationalQuote && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="p-4 rounded-lg mb-4 text-center bg-white dark:bg-gray-800 shadow-lg"
            >
              <p className="text-lg font-semibold">
                {
                  motivationalQuotes[
                    Math.floor(Math.random() * motivationalQuotes.length)
                  ]
                }
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 mb-8">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center justify-center p-4 rounded-lg ${
                activeTab === tab.id
                  ? "bg-blue-500 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300"
              } transition-colors duration-300`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="text-2xl mb-2">{tab.icon}</span>
              <span className="text-sm">{tab.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg shadow-lg p-6 overflow-x-auto bg-white dark:bg-gray-800 transition-colors duration-300"
        >
          {/* Task Controls */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">
              {tabs.find((tab) => tab.id === activeTab)?.label}
            </h2>
            <div className="flex space-x-2">
              <select
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-lg px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 transition-colors duration-300"
              >
                <option value="all">جميع الحالات</option>
                <option value="قيد التنفيذ">قيد التنفيذ</option>
                <option value="مكتمل">مكتمل</option>
                <option value="معلق">معلق</option>
              </select>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="بحث في المهام..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 rounded bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            />
          </div>

          {/* Task Statistics */}
          <div className="mb-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
            <h3 className="text-lg font-semibold mb-2">إحصائيات المهام</h3>
            <div className="flex items-center justify-between">
              <span>المهام المكتملة: {completedTasksCount}</span>
              <span>إجمالي المهام: {tasks.length}</span>
              <span>
                نسبة الإنجاز:{" "}
                {((completedTasksCount / tasks.length) * 100).toFixed(2)}%
              </span>
            </div>
            <div className="mt-2 bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{
                  width: `${(completedTasksCount / tasks.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Task Table */}
          <table className="w-full text-sm text-right">
            <thead className="text-xs uppercase bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors duration-300">
              <tr>
                <th className="px-4 py-2">حالة المهمة</th>
                <th className="px-4 py-2">المهمة</th>
                <th className="px-4 py-2">التاريخ</th>
                <th className="px-4 py-2">الموعد النهائي</th>
                <th className="px-4 py-2">الحالة</th>
                <th className="px-4 py-2">ملاحظات</th>
                <th className="px-4 py-2">المشروع المرتبط</th>
                <th className="px-4 py-2">الهدف المرتبط</th>
                <th className="px-4 py-2">الجانب الحياتي</th>
                <th className="px-4 py-2">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <motion.tr
                  key={task.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border-b border-gray-200 dark:border-gray-700 transition-colors duration-300"
                >
                  <td className="px-4 py-2">
                    <select
                      value={task.status}
                      onChange={(e) =>
                        updateTaskField(task.id, "status", e.target.value)
                      }
                      className="p-1 rounded bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                    >
                      <option value="قيد التنفيذ">قيد التنفيذ</option>
                      <option value="مكتمل">مكتمل</option>
                      <option value="معلق">معلق</option>
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    {editingTask && editingTask.id === task.id ? (
                      <input
                        type="text"
                        value={editingTask.task}
                        onChange={(e) =>
                          setEditingTask({
                            ...editingTask,
                            task: e.target.value,
                          })
                        }
                        className="p-1 rounded w-full bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                      />
                    ) : (
                      task.task
                    )}
                  </td>
                  <td className="px-4 py-2">{task.date}</td>
                  <td className="px-4 py-2">
                    {editingTask && editingTask.id === task.id ? (
                      <input
                        type="date"
                        value={editingTask.deadline}
                        onChange={(e) =>
                          setEditingTask({
                            ...editingTask,
                            deadline: e.target.value,
                          })
                        }
                        className="p-1 rounded bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                      />
                    ) : (
                      task.deadline
                    )}
                  </td>
                  <td className="px-4 py-2">
                    <select
                      value={task.state}
                      onChange={(e) =>
                        updateTaskField(task.id, "state", e.target.value)
                      }
                      className={`p-1 rounded ${
                        task.state === "عاجل"
                          ? "bg-red-100 text-red-800"
                          : task.state === "عادي"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      <option value="عاجل">عاجل</option>
                      <option value="عادي">عادي</option>
                      <option value="غير عاجل">غير عاجل</option>
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    {editingTask && editingTask.id === task.id ? (
                      <input
                        type="text"
                        value={editingTask.notes}
                        onChange={(e) =>
                          setEditingTask({
                            ...editingTask,
                            notes: e.target.value,
                          })
                        }
                        className="p-1 rounded w-full bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                      />
                    ) : (
                      task.notes
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingTask && editingTask.id === task.id ? (
                      <input
                        type="text"
                        value={editingTask.project}
                        onChange={(e) =>
                          setEditingTask({
                            ...editingTask,
                            project: e.target.value,
                          })
                        }
                        className="p-1 rounded w-full bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                      />
                    ) : (
                      task.project
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingTask && editingTask.id === task.id ? (
                      <input
                        type="text"
                        value={editingTask.goal}
                        onChange={(e) =>
                          setEditingTask({
                            ...editingTask,
                            goal: e.target.value,
                          })
                        }
                        className="p-1 rounded w-full bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                      />
                    ) : (
                      task.goal
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingTask && editingTask.id === task.id ? (
                      <input
                        type="text"
                        value={editingTask.lifeAspect}
                        onChange={(e) =>
                          setEditingTask({
                            ...editingTask,
                            lifeAspect: e.target.value,
                          })
                        }
                        className="p-1 rounded w-full bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                      />
                    ) : (
                      task.lifeAspect
                    )}
                  </td>
                  <td className="px-4 py-2 flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    {editingTask && editingTask.id === task.id ? (
                      <>
                        <button
                          onClick={() => updateTask(editingTask)}
                          className="p-1 rounded text-green-600 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-900 transition-colors duration-300"
                        >
                          <FiCheckCircle />
                        </button>
                        <button
                          onClick={() => setEditingTask(null)}
                          className="p-1 rounded text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900 transition-colors duration-300"
                        >
                          <FiAlertCircle />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => startEditTask(task)}
                          className="p-1 rounded text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900 transition-colors duration-300"
                        >
                          <FiEdit />
                        </button>
                        <button
                          onClick={() => deleteTask(task.id)}
                          className="p-1 rounded text-red-600 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900 transition-colors duration-300"
                        >
                          <FiTrash2 />
                        </button>
                      </>
                    )}
                  </td>
                </motion.tr>
              ))}
              {/* New Task Row */}
              <tr className="border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
                <td className="px-4 py-2">
                  <select
                    name="status"
                    value={newTask.status || "قيد التنفيذ"}
                    onChange={handleNewTaskChange}
                    className="p-1 rounded bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                  >
                    <option value="قيد التنفيذ">قيد التنفيذ</option>
                    <option value="مكتمل">مكتمل</option>
                    <option value="معلق">معلق</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    name="task"
                    value={newTask.task}
                    onChange={handleNewTaskChange}
                    placeholder="أدخل المهمة الجديدة"
                    className="p-1 rounded w-full bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="date"
                    name="deadline"
                    value={newTask.deadline}
                    onChange={handleNewTaskChange}
                    className="p-1 rounded bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                  />
                </td>
                <td className="px-4 py-2">
                  <select
                    name="state"
                    value={newTask.state}
                    onChange={handleNewTaskChange}
                    className="p-1 rounded bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                  >
                    <option value="عادي">عادي</option>
                    <option value="عاجل">عاجل</option>
                    <option value="غير عاجل">غير عاجل</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    name="notes"
                    value={newTask.notes}
                    onChange={handleNewTaskChange}
                    placeholder="ملاحظات"
                    className="p-1 rounded w-full bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    name="project"
                    value={newTask.project}
                    onChange={handleNewTaskChange}
                    placeholder="المشروع"
                    className="p-1 rounded w-full bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    name="goal"
                    value={newTask.goal}
                    onChange={handleNewTaskChange}
                    placeholder="الهدف"
                    className="p-1 rounded w-full bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    name="lifeAspect"
                    value={newTask.lifeAspect}
                    onChange={handleNewTaskChange}
                    placeholder="الجانب الحياتي"
                    className="p-1 rounded w-full bg-white dark:bg-gray-600 text-gray-800 dark:text-gray-200"
                  />
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={addNewTaskFromTable}
                    className="p-2 rounded bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white transition-colors duration-300"
                  >
                    إضافة
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
};

export default TaskManager;
