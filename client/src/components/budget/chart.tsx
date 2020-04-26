import React from 'react'
import { Chart } from 'react-charts'

function BudgetChart(props: any) {
    let data = [
          {
            label: 'Needs',
            data: props.data.needs
          },
          {
            label: 'Wants',
            data: props.data.wants
          },
          {
            label: 'Credit',
            data: props.data.credit
          },
        ];

    const axes = React.useMemo(
        () => [
          { primary: true, type: 'ordinal', position: 'bottom' },
          { type: 'linear', position: 'left' }
        ],
        []
      )
    

    return (
      <div style={{width: '100%', height: '500px' }}>
        <Chart data={data} axes={axes} tooltip />
      </div>
    )
  }

  export default BudgetChart;