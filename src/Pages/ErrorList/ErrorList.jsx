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

function ErrorListPage() {
  const { errors, loading, error } = useFetch();
  const [defectList, setDefectList] = useState([]);
  const [list, setList] = useState([]);
  const [assyNo, setAssyNo] = useState("");
  const [sort, setSort] = useState(true);
  const [nrReasonList, setNrReasonList] = useState([]);
  const [scroller, setScroller] = useState(null)
  const navigate = useNavigate();

  // const scroller = useRef(null);

  const defects = async () => {
    let updatedDefectList = errors[0].defectList;
    let updatedNrReasonList = errors[0].nrReasonList;
    setNrReasonList([...updatedNrReasonList]);
    setList([ ...updatedDefectList]);
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
      return <ThemeProvider theme={theme}> <TableContainer sx={{width: '100%'}} {...props} ref={ref} /></ThemeProvider>
    }),
    Table: (props) => <Table {...props} sx={{ minWidth: '100%', borderCollapse: 'collapse', tableLayout: 'fixed'}} size="small" aria-label="a dense table" />,
    TableHead: TableHead,
    TableRow: (props) =>  <TableRow hover {...props}/>,
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
                    <TableCell sx={{ width: 60 }} onClick={() => handleSortRequest('depCode')} >Bildiren</TableCell>
                    <TableCell sx={{ width: 50 }} onClick={() => handleSortRequest('bodyNo')}>Body</TableCell>
                    <TableCell onClick={() => handleSortRequest('assyNo')}>Assy</TableCell>
                    <TableCell sx={{ width: 150 }} onClick={() => handleSortRequest('vinNo')}>Vin No</TableCell>
                    <TableCell onClick={() => handleSortRequest('colorExtCode')}>Renk</TableCell>
                    <TableCell onClick={() => handleSortRequest('modelCode')}>Mdl</TableCell>
                    <TableCell onClick={() => handleSortRequest('localId')}>Sicil</TableCell>
                    <TableCell sx={{ width: 200 }} onClick={() => handleSortRequest('partName')}>Parca</TableCell>
                    <TableCell>Spot</TableCell>
                    <TableCell>Gun</TableCell>
                    <TableCell>Arc</TableCell>
                    <TableCell>ArcGun</TableCell>
                    <TableCell sx={{ width: 150 }} onClick={() => handleSortRequest('defectName')}>Hata</TableCell>
                    <TableCell onClick={() => handleSortRequest('defrankCode')}>Rank</TableCell>
                    <TableCell sx={{ width: 50 }} onClick={() => handleSortRequest('formattedDefectHour')}>Saat</TableCell>
                    <TableCell sx={{ width: 50 }} onClick={() => handleSortRequest('defectType')}>Hata Türü</TableCell>
                    <TableCell sx={{ width: 80 }} onClick={() => handleSortRequest('defrespName')}>Hata Sor</TableCell>
                    <TableCell>Alt Sorumlu</TableCell>
                    <TableCell sx={{ width: 120 }}>NR REASON</TableCell>
                    <TableCell sx={{ width: 80 }} >Kaydet</TableCell>
                    <TableCell sx={{ width: 150 }}>İşlem</TableCell>
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
                    <Button size="small" onClick={findAssyNo}>ARA</Button>
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
                    <Button size="small">ARA</Button>
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
            <ShiftArrows refList={scroller} buttonColor={'var(--apple)'}/>
          </Box>
          <Stack direction='row' flex='50%'>
            <Button size="large">ARAÇ LİSTESİ</Button>
            <Button size="large">MANUAL HATA</Button>
            <Button size="large">ÇOKLU HATA</Button>
            <Button size="large">HATA LİSTESİ</Button>
            <Button size="large">HATA KOPYA</Button>
            <Button size="large" onClick={() => navigate(`/terminals`)}>ÇIKIŞ</Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

export default ErrorListPage;
