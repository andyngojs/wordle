import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import Context from './Context';
import useTheme from './Theme/useTheme';
import { initArr2D } from './helper';
import { ENTER, CLEAR, WORDS_LIST, STATUS } from './constant';
import Header from './components/Header';
import GuessRow from './components/Guess';
import Keyboard from './components/Keyboard';

export default function App() {
  const [guessData, setGuessData] = useState(initArr2D());
  const [indexRowActive, setIndexRowActive] = useState(0);
  const [indexColActive, setIndexColActive] = useState(0);

  const [greenCap, setGreenCap] = useState([]);
  const [yellowCap, setYellowCap] = useState([]);
  const [grayCap, setGrayCap] = useState([]);

  const { styleTheme, theme, handleSwitchTheme } = useTheme();

  const restartGame = useCallback(() => {
    getRandomNumber()
    console.log('res');
    setIndexRowActive(0);
    setIndexColActive(0);
    setGreenCap([]);
    setGrayCap([]);
    setYellowCap([]);
  }, [initArr2D]);

  const getRandomNumber = useCallback(() => {
    return Math.floor(Math.random() * 12);
  }, []);

  useEffect(() => {
    restartGame()

  }, [])

  const keyWord = useMemo(() => {
    return WORDS_LIST[getRandomNumber()].split('');
  }, [WORDS_LIST, getRandomNumber]);

  const handleTypingKey = useCallback(
    (key) => {
      let guessDataClone = [...guessData];

      if (key !== ENTER && key !== CLEAR) {
        guessDataClone.map((row, indexRow) => {
          return row.map((col, indexCol) => {
            if (indexRow === indexRowActive) {
              if (indexCol === indexColActive) {
                setIndexColActive((prevState) =>
                  prevState <= 4 ? prevState + 1 : prevState,
                );
                return {
                  value: (guessDataClone[indexRow][indexCol].value = key),
                  status: (guessDataClone[indexRow][indexCol].status =
                    STATUS.TYPING),
                };
              }
            }
          });
        });
      }

      if (key === CLEAR) {
        let indexColTemp = indexColActive > 0 ? indexColActive - 1 : 0;
        if (guessDataClone[indexRowActive][indexColTemp].value.length > 0) {
          guessDataClone[indexRowActive][indexColTemp].value = '';
          guessDataClone[indexRowActive][indexColTemp].status = STATUS.NORMAL;
          setIndexColActive(indexColTemp);
        }
      }

      if (key === ENTER) {
        let wordGuessed = '';
        for (let i = 0; i < 5; i++) {
          if (guessDataClone[indexRowActive][i].status === STATUS.NORMAL) {
            alert('You have not entered enough words!');
            return;
          }

          wordGuessed = wordGuessed.concat(
            '',
            guessDataClone[indexRowActive][i].value,
          );
        }
        if (WORDS_LIST.includes(wordGuessed)) {
          checkingWord(guessDataClone);
          if (wordGuessed !== keyWord.join('')) {
            setIndexRowActive((prevState) =>
              prevState <= 5 ? prevState + 1 : 0,
            );
            setIndexColActive(0);
          } else {
            guessDataClone = []
            alert('You guessed the word correctly!');
          }
        } else {
          alert('Not in word list');
        }
      }

      setGuessData(guessDataClone);
    },
    [indexRowActive, indexColActive, keyWord, guessData],
  );

  const checkingWord = useCallback(
    (guessDataClone) => {
      for (let col = 0; col < 5; col++) {
        if (
          keyWord.includes(guessDataClone[indexRowActive][col].value) &&
          keyWord[col] === guessDataClone[indexRowActive][col].value
        ) {
          guessDataClone[indexRowActive][col].status = STATUS.GREEN;
          setGreenCap((prevState) => [
            ...prevState,
            guessDataClone[indexRowActive][col].value,
          ]);
        } else if (
          keyWord.includes(guessDataClone[indexRowActive][col].value)
        ) {
          guessDataClone[indexRowActive][col].status = STATUS.YELLOW;
          setYellowCap((prevState) => [
            ...prevState,
            guessDataClone[indexRowActive][col].value,
          ]);
        } else if (
          !keyWord.includes(guessDataClone[indexRowActive][col].value) &&
          keyWord[col] !== guessDataClone[indexRowActive][col].value
        ) {
          guessDataClone[indexRowActive][col].status = STATUS.GRAY;
          setGrayCap((prevState) => [
            ...prevState,
            guessDataClone[indexRowActive][col].value,
          ]);
        }
      }
    },
    [keyWord, indexRowActive],
  );

  const styleContainer = useMemo(
    () => ({
      backgroundColor: styleTheme.backgroundColor,
    }),
    [styleTheme],
  );

  const value = {
    theme,
    styleTheme,
    handleSwitchTheme,
    onTypingKey: handleTypingKey,
    greenCap,
    yellowCap,
    grayCap,
  };

  const renderMatrix = useCallback(() => {
    return guessData.map((item, index) => {
      return <GuessRow key={index} row={item} />;
    });
  }, [guessData]);

  return (
    <Context.Provider value={value}>
      <SafeAreaView style={[styles.container, styleContainer]}>
        <Header keyword={keyWord} />

        <View style={styles.guessContainer}>{renderMatrix()}</View>

        <Keyboard />
      </SafeAreaView>
    </Context.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  guessContainer: {
    flex: 2,
  },
});
