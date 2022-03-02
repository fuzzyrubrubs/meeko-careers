
import { Pie } from 'react-chartjs-2';

function Pie_Chart (props) {

    const _data = props.data;

    const data = {
        labels: [
          'Red',
          'Green',
          'Yellow'
        ],
        datasets: [{
            label: 'My First dataset',
          data: _data,
          backgroundColor: [
              '#7d7ddc',
              '#fd8567',
              '#f5a002',
          '#69b996',
          '#ff6688',
          '#e66e50'
          ],
          hoverBackgroundColor: [
              '#7d7ddc',
              '#fd8567',
              '#f5a002',
            '#69b996',
            '#ff6688',
            '#e66e50'
          ]
        }]
      };

    const options = {
        maintainAspectRatio: true, 
        plugins: {
            legend: {
                display: false,
                reverse: true
            },
        }
    }



    
      return (
        <div style={{width: "70%"}}>
            <Pie data={data} width={10} height={10} options={options} />
        </div>
      );
    
}

export default Pie_Chart;