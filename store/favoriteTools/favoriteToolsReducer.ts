import { LOCAL_STORAGE_KEY } from "@/utils/const";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { RootState } from "../store";

const toolNames: string[] = [];

const favoriteToolsSlice = createSlice({
  name: "favoriteTools",
  initialState: {
    toolNames,
  },
  reducers: {
    initialFavoriteTools(state, action: PayloadAction<string[]>) {
      const payload = action.payload;
      state.toolNames = payload;
      localStorage.setItem(
        LOCAL_STORAGE_KEY.FAVORITE_TOOL_NAME,
        JSON.stringify(payload)
      );
    },
    addFavoriteTool(state, action: PayloadAction<string>) {
      const payload = action.payload;
      const toolNames = [...state.toolNames, payload];
      state.toolNames = toolNames;
      localStorage.setItem(
        LOCAL_STORAGE_KEY.FAVORITE_TOOL_NAME,
        JSON.stringify(toolNames)
      );
    },

    removeFavoriteTool(state, action: PayloadAction<string>) {
      const payload = action.payload;
      const toolNames = [...state.toolNames];
      const newToolNames = toolNames.filter((toolName) => payload !== toolName);
      state.toolNames = newToolNames;
      localStorage.setItem(
        LOCAL_STORAGE_KEY.FAVORITE_TOOL_NAME,
        JSON.stringify(newToolNames)
      );
    },
  },
});

export const { addFavoriteTool, removeFavoriteTool, initialFavoriteTools } =
  favoriteToolsSlice.actions;
export const selectFavoriteTools = (state: RootState) => state.favoriteTools;
export default favoriteToolsSlice.reducer;
