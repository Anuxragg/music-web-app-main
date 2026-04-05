import { useState } from "react";
import { SearchFieldContainerStyled, SearchFieldWrapperStyled } from "./search.styled"
import { IoMdSearch } from "react-icons/io";
import api from "../../services/api";

export default function Search({ onSearch }) {
    const [query, setQuery] = useState('');

    const handleSearch = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim().length === 0) {
            onSearch({ songs: [], artists: [], albums: [], playlists: [] });
            return;
        }

        try {
            const res = await api.get(`/search?q=${encodeURIComponent(value)}`);
            if (res.data && res.data.success) {
                onSearch(res.data.data);
            }
        } catch (error) {
            console.error('Search error:', error);
        }
    };

    return (
        <SearchFieldContainerStyled>
            <SearchFieldWrapperStyled>
                <input 
                    type="text" 
                    className='search-field' 
                    name="search-field" 
                    placeholder="Search for songs . . . ♪ "
                    value={query}
                    onChange={handleSearch}
                />
                <span className="react-icon search-icon"><IoMdSearch /></span>
            </SearchFieldWrapperStyled>
        </SearchFieldContainerStyled>
    )
}