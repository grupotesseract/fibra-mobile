import { Text, Spinner, VStack, Pressable } from 'native-base';
import { StyleSheet } from 'react-native';
import brandColors from '../theme/brandColors';

type Props = {
  loading?: boolean;
  text: string;
  icon: JSX.Element;
  onPress: () => void;
};

export const SquareButton = ({
  loading = false,
  text,
  icon,
  onPress,
}: Props) => {
  return (
    <Pressable style={style.botaoQuadrado} onPress={onPress}>
      <VStack alignItems='center'>
        {loading ? (
          <Spinner color={brandColors.white} size='lg' />
        ) : (
          <>{icon}</>
        )}
        <Text color={brandColors.white} textAlign='center'>
          {text}
        </Text>
      </VStack>
    </Pressable>
  );
};

const style = StyleSheet.create({
  botaoQuadrado: {
    padding: 4,
    height: 110,
    flex: 1,
    justifyContent: 'space-evenly',
    backgroundColor: brandColors.primary,
  },
});
