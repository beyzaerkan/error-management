import React, { useState, useEffect, useRef } from 'react';
import Error from '../../Components/Error/Error';
import { useFetch } from '../../Hooks';
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Input/Input';
import Button from '../../Components/Button/Button';
import ShiftArrows from '../../Components/ShiftArrows/ShiftArrows';
import SkeletonComponent from '../../Components/SkeletonComponent/SkeletonComponent';
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Typography, Paper } from '@mui/material';
import { TableVirtuoso } from 'react-virtuoso';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

function ErrorListPage() {
  const { errors, loading, error } = useFetch();
  const [defectList, setDefectList] = useState([]);
  const [list, setList] = useState([]);
  const [assyNo, setAssyNo] = useState("");
  const [sort, setSort] = useState(true);
  const [nrReasonList, setNrReasonList] = useState([]);
  const [scroller, setScroller] = useState(null)
  const navigate = useNavigate();

  const { t } = useTranslation();

  const defects = async () => {
    let updatedDefectList = errors[0].defectList;
    let updatedNrReasonList = errors[0].nrReasonList;
    setNrReasonList([...updatedNrReasonList]);
    setList([...updatedDefectList]);
  }

  useEffect(() => {
    defects();
  }, [errors]);

  const findAssyNo = () => {
    setList(list.filter(defect => {
      return defect.assyNo === assyNo;
    }))
  }

  const onChange = (event) => {
    const inputVal = event.target.value;
    setAssyNo(inputVal);
  }

  const deleteError = value => {
    setList(oldValues => {
      return oldValues.filter(error => error !== value)
    })
  }

  const sortArray = (arr, orderBy, key) => {
    switch (orderBy) {
      case true:
      default:
        return arr.sort((a, b) =>
          a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0
        );
      case false:
        return arr.sort((a, b) =>
          a[key] < b[key] ? 1 : b[key] < a[key] ? -1 : 0
        );
    }
  };

  const handleSortRequest = (key) => {
    setList(sortArray(list, sort, key));
    setSort(!sort)
  };

  const theme = createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            border: '1px solid var(--smoke)',
            fontSize: '12px',
            padding: 0,
            textAlign: 'center',
            fontWeight: 'bold'
          },
        },
      },
    },
  });


  const TableComponents = {
    Scroller: React.forwardRef((props, ref) => {
      setScroller(ref);
      return <ThemeProvider theme={theme}> <TableContainer sx={{ width: '100%' }} {...props} ref={ref} /></ThemeProvider>
    }),
    Table: (props) => <Table {...props} sx={{ minWidth: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }} size="small" aria-label="a dense table" />,
    TableHead: TableHead,
    TableRow: (props) => <TableRow hover {...props} />,
    TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
  }

  return (
    <Box>
      {
        loading ? (
          <SkeletonComponent />
        )
          : (
            <Box>
              <TableVirtuoso
                ref={scroller}
                style={{ height: 570, width: '100%' }}
                data={list}
                components={TableComponents}
                fixedHeaderContent={() => (
                  <TableRow
                    hover
                    sx={{
                      backgroundColor: 'var(--background)',
                      height: '50px',
                    }}
                  >
                    <TableCell sx={{ width: 60 }} onClick={() => handleSortRequest('depCode')} >{t('reporting')}</TableCell>
                    <TableCell sx={{ width: 50 }} onClick={() => handleSortRequest('bodyNo')}>{t('body')}</TableCell>
                    <TableCell onClick={() => handleSortRequest('assyNo')}>{t('assy')}</TableCell>
                    <TableCell sx={{ width: 150 }} onClick={() => handleSortRequest('vinNo')}>{t('vinNO')}</TableCell>
                    <TableCell onClick={() => handleSortRequest('colorExtCode')}>{t('color')}</TableCell>
                    <TableCell onClick={() => handleSortRequest('modelCode')}>{t('mdl')}</TableCell>
                    <TableCell onClick={() => handleSortRequest('localId')}>{t('registration')}</TableCell>
                    <TableCell sx={{ width: 200 }} onClick={() => handleSortRequest('partName')}>{t('part')}</TableCell>
                    <TableCell>{t('Spot')}</TableCell>
                    <TableCell>{t('Gun')}</TableCell>
                    <TableCell>{t('Arc')}</TableCell>
                    <TableCell>{t('ArcGun')}</TableCell>
                    <TableCell sx={{ width: 150 }} onClick={() => handleSortRequest('defectName')}>{t('defectName')}</TableCell>
                    <TableCell onClick={() => handleSortRequest('defrankCode')}>{t('Rank')}</TableCell>
                    <TableCell sx={{ width: 50 }} onClick={() => handleSortRequest('formattedDefectHour')}>{t('hour')}</TableCell>
                    <TableCell sx={{ width: 50 }} onClick={() => handleSortRequest('defectType')}>{t('errorType')}</TableCell>
                    <TableCell sx={{ width: 80 }} onClick={() => handleSortRequest('defrespName')}>{t('defrespName')}</TableCell>
                    <TableCell>{t('subResponsibles')}</TableCell>
                    <TableCell sx={{ width: 120 }}>{t('NR REASON')}</TableCell>
                    <TableCell sx={{ width: 80 }} >{t('save')}</TableCell>
                    <TableCell sx={{ width: 150 }}>{t('process')}</TableCell>
                  </TableRow>
                )}
                itemContent={(index, item) => <Error key={index} errorItem={item} deleteError={deleteError} nrReasonList={nrReasonList} />}
              />
            </Box>
          )
      }

      <Box sx={{
        position: 'fixed',
        bottom: '0px',
        width: '100%',
      }}>
        {
          !loading && <Box sx={{ textAlign: 'end' }}>Total Rows: {list.length}</Box>
        }
        <Box sx={{
          backgroundColor: 'var(--snow)',
          display: 'flex',
          flexWrap: 'wrap',
          padding: '2px',
          textAlign: 'center',
        }}>
          <Box sx={{
            flex: '20%',
          }}>
            <Stack direction='row'>
              <Grid container alignItems='center'>
                <Grid item xs={4}>
                  <Typography>MONTAJ NO </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Stack direction='row'>
                    <Input type="text" value={assyNo} onChange={onChange} />
                    <Button size="small" onClick={findAssyNo}>search</Button>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
            <Stack direction='row'>
              <Grid container alignItems='center'>
                <Grid item xs={4}>
                  <Typography>BODY NO </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Stack direction='row'>
                    <Input type="text" />
                    <Button size="small">search</Button>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </Box>
          <Box sx={{
            padding: '15px 20px 0 20px',
            width: '150px',
            flex: '3%',
          }}>
            <ShiftArrows refList={scroller} buttonColor={'var(--apple)'} />
          </Box>
          <Stack direction='row' flex='50%'>
            <Button size="large">vehicleList</Button>
            <Button size="large">manualError</Button>
            <Button size="large">multiError</Button>
            <Button size="large">errorList</Button>
            <Button size="large">errorCopy</Button>
            <Button size="large" onClick={() => navigate(`/terminals`)}>exit</Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default ErrorListPage;
