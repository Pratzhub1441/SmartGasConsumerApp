import React from 'react';
import { View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import colors from '../../assets/colors/colors';

const ProgressBarChartView = ({ data = [] }) => {
  const validData = data.filter(item => item.y >= 0);
  const maxDataValue = validData.length ? Math.max(...validData.map(item => item.y)) : 1; // Set 1 for small week values

  const containerWidth = 320;
  const numBars = data.length;

  const minBarWidth = 5;
  const minSpacing = 2;

  let barWidth = (containerWidth - (numBars - 1) * minSpacing) / numBars;
  let spacing = minSpacing;

  if (barWidth < minBarWidth) {
    barWidth = minBarWidth;
    spacing = (containerWidth - barWidth * numBars) / (numBars - 1);
    spacing = Math.max(spacing, 0);
  }

  if (numBars <= 1) {
    spacing = 0;
  }

  if (barWidth === minBarWidth && spacing > 20) {
    spacing = minSpacing;
  }

  return (
    <View style={{ height: 122, width: containerWidth, justifyContent: 'center', marginTop: 15, }}>
      <BarChart
        data={data.map(item => ({
          value: item.y >= 0 ? item.y : 0,
          label: item.x,
          frontColor: colors.textColor3,
          backColor: '#f0f0f0',
          barWidth,
          barStyle: { borderRadius: 8 },
          labelTextStyle: { fontSize: 10 },
        }))}
        height={150}
        width={containerWidth}
        showYAxis={false}
        showXAxis={false}
        yAxisThickness={0}
        xAxisColor="transparent"
        spacing={spacing}
        initialSpacing={0}
        endSpacing={0}
        maxValue={maxDataValue + 0.3}
        isAnimated={true}
        showReferenceLine={false}
        barBorderRadius={8}
        adjustToWidth={true}
        xAxisLabelWidth={barWidth + spacing}
      />
    </View>
  );
};

export default ProgressBarChartView;
