import React, { useState, useEffect } from 'react';
import { Box, Button, FormControl, FormControlLabel, Grid2, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useAppStore } from '@/store/AppStore';
import { styled } from '@mui/material/styles';

// Styled components
const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.divider,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.divider,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.divider,
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
  },
  '& .MuiSelect-icon': {
    color: theme.palette.divider,
  },
}));

/**
 * CarsFilter component for filtering cars based on color and manufacturer.
 *
 * This component provides a user interface for selecting car colors and manufacturers,
 * and dispatches filter actions to update the car collection parameters in the app store.
 *
 * @returns {React.ReactElement} A React element containing the car filter form.
 */

const CarsFilter = (): React.ReactElement => {
  const [state, dispatch] = useAppStore();
  const { carColors, manufacturerList, paginatedCarCollectionParams } = state;

  const [localColor, setLocalColor] = useState(paginatedCarCollectionParams.color || '');
  const [localManufacturer, setLocalManufacturer] = useState(paginatedCarCollectionParams.manufacturer || '');

  useEffect(() => {
    setLocalColor(paginatedCarCollectionParams.color || '');
    setLocalManufacturer(paginatedCarCollectionParams.manufacturer || '');
  }, [paginatedCarCollectionParams.color, paginatedCarCollectionParams.manufacturer]);

  const handleColorChange = (event: SelectChangeEvent) => {
    setLocalColor(event.target.value as string);
  };

  const handleManufacturerChange = (event: SelectChangeEvent) => {
    setLocalManufacturer(event.target.value as string);
  };

  const submitFilter = () => {
    dispatch({
      type: 'SET_CARS_COLLECTION_PARAMS',
      payload: {
        color: localColor,
        manufacturer: localManufacturer,
        page: 1,
      },
    });
  };
  const selectMenuProps = {
    disablePortal: true,
    PaperProps: {
      elevation: 0,
      sx: {
        border: 1,
        paddingTop: 0,
        paddingBottom: 0,
        borderColor: 'divider',
        '& .MuiList-root': {
          padding: '0 !important',
        },
        '& .MuiMenuItem-root': {
          borderBottom: 1,
          borderColor: 'divider',
          '&:last-child': {
            borderBottom: 0,
          },
          '&:hover, &.Mui-selected, &.Mui-selected:hover': {
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
          },
        },
      },
    },
  };
  return (
    <Grid2 size={{ xs: 'grow', sm: 12, md: 12, xl: 12 }}>
      <Box
        component="form"
        border={1}
        p={2}
        display="flex"
        flexDirection="column"
        gap={2}
        sx={{ borderColor: 'divider', backgroundColor: 'background.paper' }}
      >
        <StyledFormControl fullWidth>
          <FormControlLabel
            labelPlacement="top"
            sx={{ alignItems: 'start', margin: 0 }}
            control={
              <Select
                value={localColor}
                onChange={handleColorChange}
                displayEmpty
                data-testid="color-select"
                fullWidth
                sx={{ textTransform: 'capitalize' }}
                MenuProps={selectMenuProps}
              >
                <MenuItem value="">All car colors</MenuItem>
                {carColors.map((color) => (
                  <MenuItem key={color} data-testid={`color-select-item-${color}`} value={color}>
                    {color}
                  </MenuItem>
                ))}
              </Select>
            }
            label="Color"
          />
        </StyledFormControl>
        <StyledFormControl fullWidth>
          <FormControlLabel
            labelPlacement="top"
            sx={{ alignItems: 'start', margin: 0 }}
            control={
              <Select
                value={localManufacturer}
                onChange={handleManufacturerChange}
                displayEmpty
                fullWidth
                data-testid="manufacturer-select"
                MenuProps={{
                  ...selectMenuProps,
                  MenuListProps: {},
                  PaperProps: {
                    ...selectMenuProps.PaperProps,
                    props: {
                      'data-testid': 'manufacturer-select-menu',
                    },
                  },
                }}
              >
                <MenuItem value="" data-testid={`manufacturer-select-item-all-manufacturers`}>
                  All Manufacturers
                </MenuItem>
                {manufacturerList.map((manufacturer) => (
                  <MenuItem
                    key={manufacturer.name}
                    data-testid={`manufacturer-select-item-${manufacturer.name}`}
                    value={manufacturer.name}
                  >
                    {manufacturer.name}
                  </MenuItem>
                ))}
              </Select>
            }
            label="Manufacturer"
          />
        </StyledFormControl>
        <Box textAlign="right">
          <Button
            variant="contained"
            data-testid="filter-button"
            onClick={submitFilter}
            sx={{ minWidth: '140px', alignSelf: 'end' }}
            disableElevation
          >
            Filter
          </Button>
        </Box>
      </Box>
    </Grid2>
  );
};

export default CarsFilter;
