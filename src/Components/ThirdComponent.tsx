import React, { useState } from 'react';
import { Checkbox, List, ListItem, ListItemIcon, ListItemText, Collapse, Box } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// Data structure for departments and their sub-departments
const data = {
  departments: [
    {
      id: 1,
      name: 'Engineering',
      subDepartments: [
        { id: 11, name: 'Frontend' },
        { id: 12, name: 'Backend' },
        { id: 13, name: 'Data Science' },
        { id: 14, name: 'AI' },
        { id: 15, name: 'IOT' },
      ],
    },
    {
      id: 2,
      name: 'HR',
      subDepartments: [
        { id: 21, name: 'Recruitment' },
        { id: 22, name: 'Employee Relations' },
      ],
    },
  ],
};

const ThirdComponent: React.FC = () => {
  // State to manage the open/close status of departments
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  // State to manage the selected checkboxes
  const [selected, setSelected] = useState<{ [key: string]: boolean }>({});

  // Toggle open/close state of a department
  const handleToggle = (id: string) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Handle select/deselect of checkboxes
  const handleSelect = (id: string, isParent: boolean = false, parentId?: string) => {
    setSelected((prev) => {
      const newSelected = { ...prev, [id]: !prev[id] };

      // If the checkbox is for a parent department
      if (isParent && parentId) {
        const subDepartmentIds = data.departments
          .find((d) => d.id === parseInt(parentId))?.subDepartments
          .map((sub) => sub.id.toString()) || [];
        // Select/deselect all sub-departments
        subDepartmentIds.forEach((subId) => {
          newSelected[subId] = newSelected[id];
        });
      } 
      // If the checkbox is for a sub-department
      else if (parentId) {
        const parentDepartment = data.departments.find((d) => d.id.toString() === parentId);
        if (parentDepartment) {
          // Check if all sub-departments are selected
          const allSubSelected = parentDepartment.subDepartments.every((sub) => newSelected[sub.id.toString()]);
          newSelected[parentId] = allSubSelected;
        }
      }

      return newSelected;
    });
  };

  return (
    <List>
      {data.departments.map((department) => (
        <Box key={department.id}>
          <ListItem button onClick={() => handleToggle(department.id.toString())}>
            <ListItemIcon>
              <Checkbox
                checked={!!selected[department.id.toString()]}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(department.id.toString(), true, department.id.toString());
                }}
              />
            </ListItemIcon>
            <ListItemText primary={department.name} />
            {open[department.id.toString()] ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open[department.id.toString()]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.subDepartments.map((subDepartment) => (
                <ListItem key={subDepartment.id} button sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Checkbox
                      checked={!!selected[subDepartment.id.toString()]}
                      onClick={() => handleSelect(subDepartment.id.toString(), false, department.id.toString())}
                    />
                  </ListItemIcon>
                  <ListItemText primary={subDepartment.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Box>
      ))}
    </List>
  );
};

export default ThirdComponent;
