import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { theme } from '../styles/theme';

interface Segment {
  value: number;
  color: string;
  emoji: string;
}

export function PieChartSimple({ reclamacoes, elogios, sugestoes }: {
  reclamacoes: number;
  elogios: number;
  sugestoes: number;
}) {
  const total = Math.max(reclamacoes + elogios + sugestoes, 1);
  const size = 190;
  const strokeWidth = 62;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const segments: Segment[] = [
    { value: reclamacoes, color: theme.colors.danger, emoji: '😡' },
    { value: elogios, color: theme.colors.happy, emoji: '😉' },
    { value: sugestoes, color: theme.colors.warning, emoji: '😍' }
  ];

  let accumulated = 0;

  return (
    <View style={styles.wrap}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((segment, index) => {
          const dash = (segment.value / total) * circumference;
          const offset = circumference - accumulated;
          accumulated += dash;

          return (
            <Circle
              key={index}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={offset}
              fill="transparent"
              rotation="-90"
              originX={size / 2}
              originY={size / 2}
            />
          );
        })}
      </Svg>

      <View style={styles.emojiCenter}>
        <Text style={styles.emoji}>😡</Text>
        <Text style={styles.emoji}>😉</Text>
        <Text style={styles.emoji}>😍</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  emojiCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  emoji: {
    fontSize: 24,
    marginVertical: 2
  }
});
