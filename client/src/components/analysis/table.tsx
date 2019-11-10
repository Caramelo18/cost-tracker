import React from "react";

import ReactTable from "react-table";
import "react-table/react-table.css";

class AnalysisTable extends React.Component<any, any> {
    render() {
        const data: any= this.props.data;
        const columns: any = this.props.header;
        
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
                          id: this.props.orderBy,
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
