import React from "react";

import ReactTable from "react-table";
import "react-table/react-table.css";

class AnalysisTable extends React.Component<any, any> {
    render() {
        const data: any= this.props.data;
        const columns: any = this.props.header;
        console.log(data);
        return (
            <div>
                <ReactTable
                    data={data}
                    columns={columns}
                    pageSize={10}
                    showPageSizeOptions={false}
                    resizable={false}
                    defaultSorted={[
                        {
                          id: "total",
                          desc: false
                        }
                      ]}
                    className="-striped -highlight"
                />
            </div>
        );
    }
}

export default AnalysisTable;
