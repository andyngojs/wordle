import React, { useCallback, useContext } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { KEYS } from '../../constant';
import Context from '../../Context';

function Keyboard() {
  const { styleTheme, onTypingKey, greenCap, yellowCap, grayCap } =
    useContext(Context);

  const styleKeyboardStatus = useCallback(
    (key) => {
      if (greenCap.includes(key)) {
        return {
          backgroundColor: styleTheme.primary,
          color: styleTheme.white,
        };
      } else if (yellowCap.includes(key)) {
        return {
          backgroundColor: styleTheme.secondary,
          color: styleTheme.white,
        };
      } else if (grayCap.includes(key)) {
        return {
          backgroundColor: styleTheme.grey,
          color: styleTheme.white,
        };
      }
      return {
        backgroundColor: styleTheme.surface,
        color: styleTheme.color
      };
    },
    [greenCap, yellowCap, grayCap, styleTheme],
  );

  const keyboardStyle = useCallback(
    (key) => ({
      backgroundColor: styleKeyboardStatus(key).backgroundColor,
    }),
    [styleKeyboardStatus],
  );

  const keyboardTextStyle = useCallback(
    (key) => ({
      color: styleKeyboardStatus(key).color,
    }),
    [styleKeyboardStatus],
  );

  const renderKeyboardRow = (row, index) => {
    return (
      <View style={styles.keyboardRow} key={index}>
        {row.map((item, index) => renderKeyboardItem(item, index))}
      </View>
    );
  };

  const renderKeyboardItem = (key, index) => {
    return (
      <TouchableHighlight
        underlayColor={'#ccc'}
        key={index}
        style={[styles.keyBtn, keyboardStyle(key)]}
        onPress={() => onTypingKey(key)}>
        <Text style={[styles.keyText, keyboardTextStyle(key)]}>{key}</Text>
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      {KEYS.map((item, index) => renderKeyboardRow(item, index))}
    </View>
  );
}

export default React.memo(Keyboard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 22,
  },
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  keyBtn: {
    marginHorizontal: 3,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  keyText: {
    fontSize: 16,
    fontWeight: '500',
    paddingVertical: 18,
  },
});
