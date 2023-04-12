import {DataGrid, GridToolbarContainer, GridToolbarExport} from "@mui/x-data-grid";
import {Box, Button} from "@mui/material";
import {useState} from "react";

function DataGridExample () {

    const [selectedRows, setSelectedRows] = useState([])

    function CustomToolbar() {
        return(
            <GridToolbarContainer>
                <GridToolbarExport />
            </GridToolbarContainer>
        )
    }

    function getFullName(params) {
       return `${params.row.name || ''} ${params.row.lastName || ''}`
    }


    function showButton(params) {
        return (
            <strong>
                <Button size={'small'}>
                    Upload
                </Button>
            </strong>
        )
    }


    const handleOnSelectedRow = (newSelectedItems) => {
        console.log(newSelectedItems)
        setSelectedRows(newSelectedItems)
    }

    const rows = [
        {id: 1, name: "John", lastName: "white",language: "Java"},
        {id: 2, name: "Jack", lastName: "Brown",language: "Python"},
        {id: 3, name: "Ellie", lastName: "black",language: "JavaScript"},
    ]

    const cols = [
        {field: 'name', headerName: "Name", width: 100},
        {field: 'language', headerName: "Language", width: 100},
        {field: 'fullName', headerName: "Full name", width: 150,
        valueGetter: getFullName
        },
        {field: 'upload', headerName: 'Upload', width: 100,
        renderCell: showButton
        }
    ]

    return(
        <>
            <Box sx={{height: "500px"}}>
                <DataGrid columns={cols} rows={rows}
                          slots={
                              {toolbar: CustomToolbar}
                          }
                          onRowSelectionModelChange={handleOnSelectedRow}
                          rowSelectionModel={selectedRows}

                />
            </Box>

        </>
    )
}

export default DataGridExample