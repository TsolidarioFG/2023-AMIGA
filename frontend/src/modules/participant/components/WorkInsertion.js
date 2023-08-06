import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const WorkInsertion = () => {
  // Mock data for testing purposes
  const initialData = [
    {
      id: 1,
      date: '2023-08-01',
      contract: 12345,
      workField: 'Field 1',
      workingDay: 'Monday',
      participant: 6789,
      specialContract: 'No',
    },
    // Add more data here if needed
  ];

  const [data, setData] = useState(initialData);

  const handleEdit = (index) => {
    // Implement edit logic here
    console.log('Edit row:', data[index]);
  };

  const handleDelete = (index) => {
    // Implement delete logic here
    console.log('Delete row:', data[index]);
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Contract</TableCell>
            <TableCell>Work Field</TableCell>
            <TableCell>Working Day</TableCell>
            <TableCell>Participant</TableCell>
            <TableCell>Special Contract</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.contract}</TableCell>
              <TableCell>{row.workField}</TableCell>
              <TableCell>{row.workingDay}</TableCell>
              <TableCell>{row.participant}</TableCell>
              <TableCell>{row.specialContract}</TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => handleEdit(index)}>
                  Edit
                </Button>
                <Button variant="outlined" onClick={() => handleDelete(index)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Add a button to create a new entry */}
      <Button variant="contained" color="primary">
        Create New Entry
      </Button>
    </TableContainer>
  );
};

export default WorkInsertion;
