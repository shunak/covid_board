import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { create } from "domain";
import { RootState } from "../../app/store";
import dataJson from "./data.json";
import dataJsonDaily from "./dataDaily.json";

const apiUrl = "https://covid19.mathdro.id/api";

type APIDATA = typeof dataJson;
type APIDATADAILY = typeof dataJsonDaily;

type covidState = {
  data: APIDATA;
  country: string;
  dailyData: APIDATADAILY;
};
const initialState: covidState = {
  data: {
    confirmed: {
      value: 102974263,
      detail: "https://covid19.mathdro.id/api/confirmed",
    },
    recovered: {
      value: 57049284,
      detail: "https://covid19.mathdro.id/api/recovered",
    },
    deaths: {
      value: 2227923,
      detail: "https://covid19.mathdro.id/api/deaths",
    },
    dailySummary: "https://covid19.mathdro.id/api/daily",
    dailyTimeSeries: {
      pattern: "https://covid19.mathdro.id/api/daily/[dateString]",
      example: "https://covid19.mathdro.id/api/daily/2-14-2020",
    },
    image: "https://covid19.mathdro.id/api/og",
    source: "https://github.com/mathdroid/covid19",
    countries: "https://covid19.mathdro.id/api/countries",
    countryDetail: {
      pattern: "https://covid19.mathdro.id/api/countries/[country]",
      example: "https://covid19.mathdro.id/api/countries/USA",
    },
    lastUpdate: "2021-02-01T06:22:27.000Z",
  },
  country: "",
  dailyData: [
    {
      confirmed: {
        total: 555,
      },
      deaths: {
        total: 17,
      },
      reportDate: "2020-01-22",
    },
    {
      confirmed: {
        total: 84121,
      },
      deaths: {
        total: 2873,
      },
      reportDate: "2020-02-28",
    },
    {
      confirmed: {
        total: 799018,
      },
      deaths: {
        total: 39620,
      },
      reportDate: "2020-03-30",
    },
    {
      confirmed: {
        total: 3274139,
      },
      deaths: {
        total: 236559,
      },
      reportDate: "2020-04-30",
    },
    {
      confirmed: {
        total: 6078261,
      },
      deaths: {
        total: 371610,
      },
      reportDate: "2020-05-30",
    },
    {
      confirmed: {
        total: 10447289,
      },
      deaths: {
        total: 508361,
      },
      reportDate: "2020-06-30",
    },
    {
      confirmed: {
        total: 17304066,
      },
      deaths: {
        total: 669124,
      },
      reportDate: "2020-07-30",
    },
    {
      confirmed: {
        total: 25220408,
      },
      deaths: {
        total: 846353,
      },
      reportDate: "2020-08-30",
    },
    {
      confirmed: {
        total: 33968093,
      },
      deaths: {
        total: 1014161,
      },
      reportDate: "2020-09-30",
    },
  ],
};

export const fetchAsyncGet = createAsyncThunk("covid/get", async () => {
  const { data } = await axios.get<APIDATA>(apiUrl);
  return data;
});

export const fetchAsyncGetDaily = createAsyncThunk(
  "covid/getDaily",
  async () => {
    const { data } = await axios.get<APIDATADAILY>(
      "https://covid19-api-udemy.herokuapp.com/api/daily"
    );
    return data;
  }
);

export const fetchAsyncGetCountry = createAsyncThunk(
  "covid/getCountry",
  async (country: string) => {
    let dynamicUrl = apiUrl;
    if (country) {
      dynamicUrl = `${apiUrl}/countries/${country}`;
    }
    const { data } = await axios.get<APIDATA>(dynamicUrl);
    return { data: data, country: country };
  }
);

const covidSlice = createSlice({
  name: "covid",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload,
      };
    });
    builder.addCase(fetchAsyncGetDaily.fulfilled, (state, action) => {
      return {
        ...state,
        dailyData: action.payload,
      };
    });
    builder.addCase(fetchAsyncGetCountry.fulfilled, (state, action) => {
      return {
        ...state,
        data: action.payload.data,
        country: action.payload.country,
      };
    });
  },
});

export const selectData = (state: RootState) => state.covid.data;
export const selectDailyData = (state: RootState) => state.covid.dailyData;
export const selectCountry = (state: RootState) => state.covid.country;

export default covidSlice.reducer;
