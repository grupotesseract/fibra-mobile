import React from 'react';
import { Image, ImageStyle, StyleSheet, View, ViewStyle } from 'react-native';
import { moderateScale } from 'react-native-size-matters';

interface Style {
  image: ImageStyle;
  container: ViewStyle;
}

const Logo = (props) => {
  const dimensions = StyleSheet.create({
    xlg: { width: moderateScale(280), height: moderateScale(59) },
    lg: { width: moderateScale(224), height: moderateScale(48) },
    md: { width: moderateScale(146), height: moderateScale(31) },
    sm: { width: moderateScale(104), height: moderateScale(22) },
    xs: { width: moderateScale(90), height: moderateScale(19) },
  });

  const styles = StyleSheet.create<Style>({
    image: {
      ...dimensions[props.size],
    },
    container: {
      alignSelf: props.center ? 'center' : undefined,
    },
  });

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode='center'
        source={require('../../assets/fibraheader.png')}
      />
    </View>
  );
};

export default Logo;
