import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

/**
 * React Native component representing a calendar and task management app.
 *
 * @returns {JSX.Element} Rendered component.
 */
const App = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTextField, setShowTextField] = useState(false);
  const [task, setTask] = useState('');
  const [savedTasks, setSavedTasks] = useState({}); // New state to store saved tasks

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const getDaysArray = (year, month) => {
    var date = new Date(year, month, 1);
    var result = [];
    while (date.getMonth() === month) {
      result.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return result;
  };

  const daysInMonth = getDaysArray(currentMonth.getFullYear(), currentMonth.getMonth());

  const changeMonth = (increment) => {
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + increment, 1);
    setCurrentMonth(newMonth);
    setSelectedDate(null);
    setShowTextField(false);
  };

  const selectDate = (date) => {
    const selected = date.toISOString().split('T')[0];
    setSelectedDate(selectedDate !== selected ? selected : null);
    setShowTextField(false);
  };

  const onCreateTask = () => {
    setShowTextField(true);
  };

  const onSaveTask = () => {
    if (task && selectedDate) {
      const updatedTasks = { ...savedTasks };
      if (!updatedTasks[selectedDate]) {
        updatedTasks[selectedDate] = [];
      }
      updatedTasks[selectedDate].push(task);
      setSavedTasks(updatedTasks);
      setTask(''); 
      setShowTextField(false); 
    }
  };

  const onTaskChange = (text) => {
    setTask(text);
  };

  const savedTasksForSelectedDate = savedTasks[selectedDate] || [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Text style={styles.buttonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>{monthNames[currentMonth.getMonth()] + ' ' + currentMonth.getFullYear()}</Text>
        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Text style={styles.buttonText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.daysRow}>
        {days.map(day => (
          <Text key={day} style={styles.day}>{day}</Text>
        ))}
      </View>
      <View style={styles.daysContainer}>
        {daysInMonth.map((date, index) => {
          const dateString = date.toISOString().split('T')[0];
          return (
            <TouchableOpacity key={index} style={styles.dayContainer} onPress={() => selectDate(date)}>
              <Text style={styles.dateText}>{date.getDate()}</Text>
              <View style={styles.checkbox}>
                {selectedDate === dateString && <View style={styles.checkboxSelected} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      {selectedDate && (
        <TouchableOpacity style={styles.createTaskButton} onPress={onCreateTask}>
          <Text style={styles.createTaskButtonText}>Create Task</Text>
        </TouchableOpacity>
      )}
      {showTextField && (
        <>
          <TextInput 
            style={styles.taskInput} 
            onChangeText={onTaskChange} 
            value={task} 
            placeholder="Enter task description" 
          />
          <TouchableOpacity style={styles.saveButton} onPress={onSaveTask}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </>
      )}
      {savedTasksForSelectedDate.length > 0 && (
        <View>
          <Text style={styles.savedTasksTitle}>Saved Tasks for {selectedDate}:</Text>
          {savedTasksForSelectedDate.map((savedTask, index) => (
            <Text key={index} style={styles.savedTaskItem}>{savedTask}</Text>
          ))}
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 20,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  day: {
    width: 30,
    textAlign: 'center',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: '80%',
  },
  dayContainer: {
    width: '14%', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 16,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  checkboxSelected: {
    height: 10,
    width: 10,
    backgroundColor: '#000',
  },
  createTaskButton: {
    marginTop: 20,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  createTaskButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  taskInput: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    width: '80%',
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  savedTasksTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  savedTaskItem: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default App;
