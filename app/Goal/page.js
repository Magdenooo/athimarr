"use client"
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCalendar, FiCheck, FiX, FiSearch, FiPlus,
  FiGrid, FiList, FiEdit, FiTrash, FiRefreshCw,
  FiChevronDown, FiChevronUp
} from 'react-icons/fi';
import Select from 'react-select';

function Goal() {
  const [goals, setGoals] = useState(() => {
    const savedGoals = localStorage.getItem('goals');
    return savedGoals ? JSON.parse(savedGoals) : [
      {
        id: 1,
        name: "تعلم لغة برمجة جديدة",
        lifeAspect: "تطوير الذات",
        quarter: "P1",
        deadline: "2024-06-30",
        status: "بدأت",
        archived: false,
        relatedProjects: [
          { id: 1, name: "إنشاء تطبيق ويب" },
          { id: 2, name: "بناء محفظة أعمال" }
        ]
      },
    ];
  });

  const [viewMode, setViewMode] = useState('table');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAspect, setFilterAspect] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [newGoal, setNewGoal] = useState({
    name: '',
    lifeAspect: '',
    quarter: '',
    deadline: '',
    status: 'لم أبدأ',
    archived: false,
    relatedProjects: [],
  });
  const [newProject, setNewProject] = useState('');
  const [isAddingGoal, setIsAddingGoal] = useState(false);

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  const lifeAspectOptions = [
    { value: 'تطوير الذات', label: 'تطوير الذات' },
    { value: 'الصحة', label: 'الصحة' },
    { value: 'العمل', label: 'العمل' },
    { value: 'الدراسة', label: 'الدراسة' },
    { value: 'الدين', label: 'الدين' },
    { value: 'الترفيه', label: 'الترفيه' }
  ];

  const quarterOptions = [
    { value: 'P1', label: 'P1' },
    { value: 'P2', label: 'P2' },
    { value: 'P3', label: 'P3' },
    { value: 'P4', label: 'P4' }
  ];

  const statusOptions = [
    { value: 'لم أبدأ', label: 'لم أبدأ' },
    { value: 'بدأت', label: 'بدأت' },
    { value: 'انتهى', label: 'انتهى' }
  ];

  const getLifeAspectColor = (aspect) => {
    const colors = {
      'تطوير الذات': 'bg-blue-100 text-blue-800',
      'الصحة': 'bg-green-100 text-green-800',
      'العمل': 'bg-red-100 text-red-800',
      'الدراسة': 'bg-yellow-100 text-yellow-800',
      'الدين': 'bg-purple-100 text-purple-800',
      'الترفيه': 'bg-pink-100 text-pink-800'
    };
    return colors[aspect] || 'bg-gray-100 text-gray-800';
  };

  const filteredGoals = goals.filter(goal => 
    goal.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterAspect === 'all' || goal.lifeAspect === filterAspect) &&
    (filterStatus === 'all' || goal.status === filterStatus)
  );

  const sortedGoals = React.useMemo(() => {
    let sortableGoals = [...filteredGoals];
    if (sortConfig.key !== null) {
      sortableGoals.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableGoals;
  }, [filteredGoals, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const addNewGoal = () => {
    setGoals([...goals, { ...newGoal, id: goals.length + 1, relatedProjects: newGoal.relatedProjects.map((project, index) => ({ id: index + 1, name: project })) }]);
    setNewGoal({
      name: '',
      lifeAspect: '',
      quarter: '',
      deadline: '',
      status: 'لم أبدأ',
      archived: false,
      relatedProjects: [],
    });
    setIsAddingGoal(false);
  };

  const editGoal = (goalId, field, value) => {
    setGoals(goals.map(goal => 
      goal.id === goalId ? { ...goal, [field]: value } : goal
    ));
  };

  const deleteGoal = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const addRelatedProject = (goalId) => {
    if (newProject.trim() !== '') {
      setGoals(goals.map(goal => 
        goal.id === goalId ? { 
          ...goal, 
          relatedProjects: [...goal.relatedProjects, { id: goal.relatedProjects.length + 1, name: newProject.trim() }]
        } : goal
      ));
      setNewProject('');
    }
  };

  const removeRelatedProject = (goalId, projectId) => {
    setGoals(goals.map(goal => 
      goal.id === goalId ? {
        ...goal,
        relatedProjects: goal.relatedProjects.filter(project => project.id !== projectId)
      } : goal
    ));
  };

  const refreshData = () => {
    localStorage.setItem('goals', JSON.stringify(goals));
    alert('تم حفظ البيانات بنجاح!');
  };

  return (
    <div className="container mx-auto px-4 py-8 text-right bg-gray-100 min-h-screen" dir="rtl">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-700">أهدافي</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex space-x-4">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded transition-colors duration-300 ${viewMode === 'grid' ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-500 hover:bg-indigo-100'}`}
          >
            <FiGrid />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded transition-colors duration-300 ${viewMode === 'table' ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-500 hover:bg-indigo-100'}`}
          >
            <FiList />
          </button>
          <button
            onClick={refreshData}
            className="p-2 rounded bg-green-500 text-white hover:bg-green-600 transition-colors duration-300"
          >
            <FiRefreshCw />
          </button>
        </div>
        <div className="flex flex-wrap items-center space-x-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="بحث عن الأهداف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 pl-10 border rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <Select
            options={[{ value: 'all', label: 'جميع الجوانب' }, ...lifeAspectOptions]}
            value={{ value: filterAspect, label: filterAspect === 'all' ? 'جميع الجوانب' : filterAspect }}
            onChange={(selectedOption) => setFilterAspect(selectedOption.value)}
            className="w-48"
            placeholder="اختر جانب الحياة"
            styles={{
              control: (base) => ({
                ...base,
                borderColor: '#E2E8F0',
                '&:hover': { borderColor: '#CBD5E0' },
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected ? '#4C51BF' : state.isFocused ? '#E2E8F0' : 'white',
                color: state.isSelected ? 'white' : '#2D3748',
              }),
            }}
          />
          <Select
            options={[{ value: 'all', label: 'جميع الحالات' }, ...statusOptions]}
            value={{ value: filterStatus, label: filterStatus === 'all' ? 'جميع الحالات' : statusOptions.find(option => option.value === filterStatus)?.label }}
            onChange={(selectedOption) => setFilterStatus(selectedOption.value)}
            className="w-48"
            placeholder="اختر الحالة"
            styles={{
              control: (base) => ({
                ...base,
                borderColor: '#E2E8F0',
                '&:hover': { borderColor: '#CBD5E0' },
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected ? '#4C51BF' : state.isFocused ? '#E2E8F0' : 'white',
                color: state.isSelected ? 'white' : '#2D3748',
              }),
            }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'table' ? (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-indigo-500 text-white">
                <tr>
                  <th className="p-3 text-right cursor-pointer hover:bg-indigo-600 transition-colors duration-300" onClick={() => requestSort('name')}>
                    اسم الهدف {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? <FiChevronUp className="inline" /> : <FiChevronDown className="inline" />)}
                  </th>
                  <th className="p-3 text-right cursor-pointer hover:bg-indigo-600 transition-colors duration-300" onClick={() => requestSort('lifeAspect')}>
                    جانب الحياة {sortConfig.key === 'lifeAspect' && (sortConfig.direction === 'ascending' ? <FiChevronUp className="inline" /> : <FiChevronDown className="inline" />)}
                  </th>
                  <th className="p-3 text-right cursor-pointer hover:bg-indigo-600 transition-colors duration-300" onClick={() => requestSort('quarter')}>
                    ربع السنة {sortConfig.key === 'quarter' && (sortConfig.direction === 'ascending' ? <FiChevronUp className="inline" /> : <FiChevronDown className="inline" />)}
                  </th>
                  <th className="p-3 text-right cursor-pointer hover:bg-indigo-600 transition-colors duration-300" onClick={() => requestSort('deadline')}>
                    الموعد النهائي {sortConfig.key === 'deadline' && (sortConfig.direction === 'ascending' ? <FiChevronUp className="inline" /> : <FiChevronDown className="inline" />)}
                  </th>
                  <th className="p-3 text-right cursor-pointer hover:bg-indigo-600 transition-colors duration-300" onClick={() => requestSort('status')}>
                    الحالة {sortConfig.key === 'status' && (sortConfig.direction === 'ascending' ? <FiChevronUp className="inline" /> : <FiChevronDown className="inline" />)}
                  </th>
                  <th className="p-3 text-right">أرشفة</th>
                  <th className="p-3 text-right">المشاريع المرتبطة</th>
                  <th className="p-3 text-right">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {sortedGoals.map((goal) => (
                  <tr key={goal.id} className="border-b hover:bg-gray-50 transition-colors duration-300">
                    <td className="p-3">{goal.name}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-sm ${getLifeAspectColor(goal.lifeAspect)}`}>
                        {goal.lifeAspect}
                      </span>
                    </td>
                    <td className="p-3">{goal.quarter}</td>
                    <td className="p-3">{goal.deadline}</td>
                    <td className="p-3">
                      <Select
                        options={statusOptions}
                        value={statusOptions.find(option => option.value === goal.status)}
                        onChange={(selectedOption) => editGoal(goal.id, 'status', selectedOption.value)}
                        className="w-40"
                        styles={{
                          control: (base) => ({
                            ...base,
                            borderColor: '#E2E8F0',
                            '&:hover': { borderColor: '#CBD5E0' },
                          }),
                          option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isSelected ? '#4C51BF' : state.isFocused ? '#E2E8F0' : 'white',
                            color: state.isSelected ? 'white' : '#2D3748',
                          }),
                        }}
                      />
                    </td>
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={goal.archived}
                        onChange={(e) => editGoal(goal.id, 'archived', e.target.checked)}
                        className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                      />
                    </td>
                    <td className="p-3">
                      <ul className="list-disc list-inside">
                        {goal.relatedProjects.map((project) => (
                          <li key={project.id} className="text-sm text-gray-600 flex items-center justify-between">
                            {project.name}
                            <button
                              onClick={() => removeRelatedProject(goal.id, project.id)}
                              className="text-red-500 hover:text-red-700 mr-2 transition-colors duration-300"
                            >
                              <FiX />
                            </button>
                          </li>
                        ))}
                      </ul>
                      <div className="flex mt-2">
                        <input
                          type="text"
                          value={newProject}
                          onChange={(e) => setNewProject(e.target.value)}
                          placeholder="مشروع جديد"
                          className="p-1 border rounded flex-grow focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                          onClick={() => addRelatedProject(goal.id)}
                          className="mr-2 p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300"
                        >
                          <FiPlus />
                        </button>
                      </div>
                    </td>
                    <td className="p-3 flex items-center">
                      <button
                        onClick={() => editGoal(goal.id)}
                        className="text-yellow-500 hover:text-yellow-700 ml-2 transition-colors duration-300"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => deleteGoal(goal.id)}
                        className="text-red-500 hover:text-red-700 transition-colors duration-300"
                      >
                        <FiTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4">
              <button
                onClick={() => setIsAddingGoal(!isAddingGoal)}
                className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition-colors duration-300"
              >
                {isAddingGoal ? 'إلغاء' : 'إضافة هدف جديد'}
              </button>
            </div>
            {isAddingGoal && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="mt-4 bg-white p-6 rounded-lg shadow-lg"
              >
                <h3 className="text-lg font-semibold mb-4">إضافة هدف جديد</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="اسم الهدف"
                    value={newGoal.name}
                    onChange={(e) => setNewGoal({...newGoal, name: e.target.value})}
                    className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <Select
                    options={lifeAspectOptions}
                    value={lifeAspectOptions.find(option => option.value === newGoal.lifeAspect)}
                    onChange={(selectedOption) => setNewGoal({...newGoal, lifeAspect: selectedOption.value})}
                    placeholder="اختر جانب الحياة"
                    className="w-full"
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderColor: '#E2E8F0',
                        '&:hover': { borderColor: '#CBD5E0' },
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected ? '#4C51BF' : state.isFocused ? '#E2E8F0' : 'white',
                        color: state.isSelected ? 'white' : '#2D3748',
                      }),
                    }}
                  />
                  <Select
                    options={quarterOptions}
                    value={quarterOptions.find(option => option.value === newGoal.quarter)}
                    onChange={(selectedOption) => setNewGoal({...newGoal, quarter: selectedOption.value})}
                    placeholder="اختر ربع السنة"
                    className="w-full"
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderColor: '#E2E8F0',
                        '&:hover': { borderColor: '#CBD5E0' },
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected ? '#4C51BF' : state.isFocused ? '#E2E8F0' : 'white',
                        color: state.isSelected ? 'white' : '#2D3748',
                      }),
                    }}
                  />
                  <input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                    className="p-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <Select
                    options={statusOptions}
                    value={statusOptions.find(option => option.value === newGoal.status)}
                    onChange={(selectedOption) => setNewGoal({...newGoal, status: selectedOption.value})}
                    placeholder="اختر الحالة"
                    className="w-full"
                    styles={{
                      control: (base) => ({
                        ...base,
                        borderColor: '#E2E8F0',
                        '&:hover': { borderColor: '#CBD5E0' },
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected ? '#4C51BF' : state.isFocused ? '#E2E8F0' : 'white',
                        color: state.isSelected ? 'white' : '#2D3748',
                      }),
                    }}
                  />
                  <div className="flex items-center">
                    <label className="ml-2">أرشفة:</label>
                    <input
                      type="checkbox"
                      checked={newGoal.archived}
                      onChange={(e) => setNewGoal({...newGoal, archived: e.target.checked})}
                      className="form-checkbox h-5 w-5 text-indigo-600"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    onClick={addNewGoal}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
                  >
                    إضافة الهدف
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {sortedGoals.map((goal) => (
              <motion.div
                key={goal.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">{goal.name}</h2>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`px-3 py-1 rounded-full text-sm ${getLifeAspectColor(goal.lifeAspect)}`}>
                      {goal.lifeAspect}
                    </div>
                    <div>{goal.quarter}</div>
                  </div>
                  <div className="flex items-center mb-4">
                    <FiCalendar className="text-gray-500 ml-2" />
                    <span className="text-sm text-gray-600">{goal.deadline}</span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <Select
                      options={statusOptions}
                      value={statusOptions.find(option => option.value === goal.status)}
                      onChange={(selectedOption) => editGoal(goal.id, 'status', selectedOption.value)}
                      className="w-40"
                      styles={{
                        control: (base) => ({
                          ...base,
                          borderColor: '#E2E8F0',
                          '&:hover': { borderColor: '#CBD5E0' },
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isSelected ? '#4C51BF' : state.isFocused ? '#E2E8F0' : 'white',
                          color: state.isSelected ? 'white' : '#2D3748',
                        }),
                      }}
                    />
                    <div className="flex items-center">
                      <span className="ml-2">أرشفة:</span>
                      <input
                        type="checkbox"
                        checked={goal.archived}
                        onChange={(e) => editGoal(goal.id, 'archived', e.target.checked)}
                        className="form-checkbox h-5 w-5 text-indigo-600"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">المشاريع المرتبطة:</h3>
                    <ul className="list-disc list-inside">
                      {goal.relatedProjects.map((project) => (
                        <li key={project.id} className="text-sm text-gray-600 flex items-center justify-between">
                          {project.name}
                          <button
                            onClick={() => removeRelatedProject(goal.id, project.id)}
                            className="text-red-500 hover:text-red-700 mr-2 transition-colors duration-300"
                          >
                            <FiX />
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="flex mt-2">
                      <input
                        type="text"
                        value={newProject}
                        onChange={(e) => setNewProject(e.target.value)}
                        placeholder="مشروع جديد"
                        className="p-1 border rounded flex-grow focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <button
                        onClick={() => addRelatedProject(goal.id)}
                        className="mr-2 p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300"
                      >
                        <FiPlus />
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => editGoal(goal.id)}
                      className="text-yellow-500 hover:text-yellow-700 ml-2 transition-colors duration-300"
                    >
                      <FiEdit />
                    </button>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-300"
                    >
                      <FiTrash />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Goal;