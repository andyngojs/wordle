import React, { useContext, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Context from '../../Context';

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 32,
  },
  header: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
  iconTheme: {
    fontSize: 26,
  },
});

const _Header = ({keyword}) => {
  const { theme, styleTheme, handleSwitchTheme } = useContext(Context);

  const styleText = useMemo(
    () => ({
      color: styleTheme.color,
    }),
    [styleTheme],
  );

  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.header, styleText]}>Wordle {keyword}</Text>

      <TouchableOpacity onPress={handleSwitchTheme}>
        {theme ? (
          <Icon name="weather-night" style={[styles.iconTheme, styleText]} />
        ) : (
          <Icon name="weather-sunny" style={[styles.iconTheme, styleText]} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const Header = React.memo(_Header);

export default Header;
