import React, { useState, useEffect, useCallback } from 'react';
import { TreeTable } from 'primereact/treetable';
import { Column } from 'primereact/column';

export default function TreeTableCom({ start, end }) {
  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getTree = useCallback( async () => {
    const requestData = {
      startDate: start,
      endDate: end,
    };

    try {
      const response = await fetch('/api/jde', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        setTreeData(data);
      } else {
        console.error('Request failed');
      }
    } catch (error) {
      console.error('An error occurred', error);
    } finally {
      setLoading(false);
    }
  },[]);

  useEffect(() => {
    getTree();
  }, [start, end]);

  return (
    <div className="card">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <TreeTable
          className='table-tree'
          value={treeData}
          paginator
          paginatorClassName='custom-paginator'
          paginatorButtonClassName='custom-paginator-button'
          paginatorInputClassName='custom-paginator-input'
          template='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink' 
          rows={10}
          rowsPerPageOptions={[5, 10, 25]}
          tableStyle={{ minWidth: '50rem' }}
        >
          <Column field="jde" header="GL code" 
            expander 
            headerClassName="header-table" 
            bodyClassName="body-table"
          ></Column>
          <Column field="resa_id" header="Resa ID" 
            headerClassName="header-table" 
            bodyClassName="body-table"
          ></Column>
          <Column field="serv_id" header="Service ID" 
            headerClassName="header-table"
            bodyClassName="body-table"
          ></Column>
          <Column field="serv_type" header="Service Type" 
            headerClassName="header-table"
            bodyClassName="body-table"
          ></Column>
          <Column field="serv_curr" header="Currency" 
            headerClassName="header-table"
            bodyClassName="body-table"
          ></Column>
          <Column field="serv_book" header="Booking ID" 
            headerClassName="header-table"
            bodyClassName="body-table"
          ></Column>
          <Column field="serv_pay" header="Paying ID" 
            headerClassName="header-table"
            bodyClassName="body-table"
          ></Column>
          <Column field="description" header="Description" 
            headerClassName="header-table"
            bodyClassName="body-table"
          ></Column>
          <Column field="tax_claim" header="tax" 
            headerClassName="header-table"
            bodyClassName="body-table"
          ></Column>
          <Column field="total" header="Total" 
            headerClassName="header-table"
            bodyClassName="body-table"
          ></Column>
          <Column field="serv_inv" header="Invoice No" 
            headerClassName="header-table"
            bodyClassName="body-table"
          ></Column>
        </TreeTable>
      )}
    </div>
  );
}
