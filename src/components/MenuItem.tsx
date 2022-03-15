import { Pressable, StyleSheet } from 'react-native';
import { Flex, Text, IPressableProps } from 'native-base';
import brandColors from '../theme/brandColors';

interface IMenuItem extends IPressableProps {
  icon: JSX.Element;
  text: string;
  invertColors?: boolean;
}

const MenuItem = (props: IMenuItem) => {
  const { onPress, icon, text, disabled } = props;
  const invertColors = props.invertColors || false;
  let colorsStyle = styles.default;
  if (disabled) {
    colorsStyle = styles.disable;
  }
  if (invertColors) {
    colorsStyle = styles.inverted;
  }

  return (
    <Pressable onPress={onPress}>
      <Flex style={[styles.btnMenuItem, colorsStyle]}>
        {icon}
        <Text color={invertColors ? brandColors.primary : brandColors.white}>
          {text}
        </Text>
      </Flex>
    </Pressable>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  btnMenuItem: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 2
  },
  default: {
    backgroundColor: brandColors.primary,
  },
  inverted: {
    backgroundColor: brandColors.white,
    borderColor: brandColors.primary,
    borderWidth: 1,
  },
  disable: {
    backgroundColor: brandColors.disabled,
  },
});
