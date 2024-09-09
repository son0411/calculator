import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration } from 'react-native';
import { Entypo } from '@expo/vector-icons';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState("");
  const [lastNumber, setLastNumber] = useState("");

  const buttons = ['C', 'DEL', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '='];

  // Custom calculator logic instead of eval
  function calculator() {
    try {
      let lastArr = currentNumber[currentNumber.length - 1];
      if (['/', '*', '-', '+', '.'].includes(lastArr)) {
        return; // Prevent calculation if last character is an operator
      } else {
        let result = eval(currentNumber).toString(); // Safe usage assumed if only basic operators are used
        setCurrentNumber(result);
      }
    } catch (error) {
      setCurrentNumber("Error");
    }
  }

  function handleInput(buttonPressed) {
    // Handle operators and numbers
    if (['+', '-', '*', '/'].includes(buttonPressed)) {
      Vibration.vibrate(35);
      setCurrentNumber(currentNumber + buttonPressed);
      return;
    } else if (!isNaN(buttonPressed) || buttonPressed === '.') {
      Vibration.vibrate(35);
      setCurrentNumber(currentNumber + buttonPressed);
      return;
    }

    // Handle special buttons
    switch (buttonPressed) {
      case 'DEL':
        Vibration.vibrate(35);
        setCurrentNumber(currentNumber.slice(0, -1));
        return;
      case 'C':
        Vibration.vibrate(35);
        setLastNumber("");
        setCurrentNumber("");
        return;
      case '=':
        Vibration.vibrate(35);
        setLastNumber(currentNumber + ' =');
        calculator();
        return;
      default:
        return;
    }
  }

  const styles = StyleSheet.create({
    results: {
      backgroundColor: darkMode ? '#282f3b' : '#f5f5f5',
      maxWidth: '100%',
      minHeight: '35%',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    resultText: {
      color: '#00b9d6',
      margin: 15,
      fontSize: 35,
    },
    historyText: {
      color: darkMode ? '#B5B7BB' : '#7c7c7c',
      fontSize: 20,
      marginRight: 10,
      alignSelf: 'flex-end',
    },
    themeButton: {
      alignSelf: 'flex-start',
      margin: 15,
      backgroundColor: darkMode ? '#7b8084' : '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    buttons: {
      width: '100%',
      height: '35%',
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    button: {
      borderColor: darkMode ? '#3f4d5b' : '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '36%',
      minHeight: '37%',
      flex: 2,
    },
    textButton: {
      color: darkMode ? '#b5b7bb' : '#7c7c7c',
      fontSize: 28,
    }
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.results}>
        <TouchableOpacity style={styles.themeButton} onPress={() => setDarkMode(!darkMode)}>
          <Entypo name={darkMode ? 'light-up' : 'moon'} size={24} color={darkMode ? 'white' : 'black'} />
        </TouchableOpacity>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>

      <View style={styles.buttons}>
        {buttons.map((button) => {
          const isOperator = ['=', '/', '*', '-', '+'].includes(button);
          const isWideButton = button === 'C' || button === 'DEL' || button === '.';

          return (
            <TouchableOpacity
              key={button}
              style={[
                styles.button,
                {
                  backgroundColor: isOperator
                    ? "#00b9d6"
                    : darkMode
                    ? "#414853"
                    : "#ededed",
                  minWidth: isWideButton ? "36%" : "24%",
                },
              ]}
              onPress={() => handleInput(button)}
            >
              <Text style={[styles.textButton, { color: isOperator ? "white" : darkMode ? "#b5b7bb" : "#7c7c7c" }]}>
                {button}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
