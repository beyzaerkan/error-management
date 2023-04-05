import React, { useEffect, useState } from 'react';
import { useFetch } from '../../Hooks';
import Terminal from '../../Components/Terminal/Terminal'
import SkeletonComponent from '../../Components/SkeletonComponent/SkeletonComponent';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

function TerminalListPage() {
  const { terminals, loading, error } = useFetch();

  const [terminalList, setTerminalList] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    setTerminalList(terminals);
  }, [terminals]);

  const theme = createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            border: '1px solid var(--smoke)',
            fontWeight: 'bold',
            textAlign: "center",
            textTransform: "uppercase",
          },
        },
      },
    },
  });


  return (
    <ThemeProvider theme={theme}>
      <Box>
        {loading ? (
          <SkeletonComponent />
        ) :
          <TableContainer>
            <Table sx={{ width: '100%', overflow: 'hidden' }} aria-label="simple table">
              <TableHead>
                <TableRow >
                  <TableCell colSpan={2}>
                    <Typography sx={{ color: 'var(--apple)', textDecoration: 'underline', fontWeight: 'bold' }}>{t('allTerminals')}</Typography>
                  </TableCell>
                </TableRow>
                <TableRow >
                  <TableCell align="center" sx={{ width: '20%', color: 'var(--apple)' }}>{t('departmentBased')}</TableCell>
                  <TableCell align="center" sx={{ color: 'var(--apple)' }}  >{t('filterBased')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  terminalList.map((element, index) => {
                    return (
                      <Terminal key={index} element={element} />
                    )
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        }
      </Box>
    </ThemeProvider>
  );
}

export default TerminalListPage;
