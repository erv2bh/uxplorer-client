import { useNavigate } from "react-router-dom";

import styled from "styled-components";

function SearchNavigation() {
  const navigate = useNavigate();

  return (
    <Nav>
      <SearchContainer>
        <Icon>🔍</Icon>
        <SearchInput type="text" placeholder="테스트 이름을 입력해주세요." />
        <SearchButton>검색</SearchButton>
      </SearchContainer>
      <NewTestButton onClick={() => navigate("/new-test/test-detail")}>
        + 새 테스트
      </NewTestButton>
    </Nav>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em 2em;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  height: 40px;
`;

const SearchContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const SearchInput = styled.input`
  padding: 10px 10px 10px 35px;
  border: solid #ddd;
  border-radius: 5px;
  width: 500px;
`;

const Icon = styled.span`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #ccc;
`;

const SearchButton = styled.button`
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translateY(-50%);
  padding: 10px;
  background-color: #355e70;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #133341;
  }
`;

const NewTestButton = styled.button`
  padding: 10px 20px;
  background-color: #355e70;
  color: white;
  border: none;
  border-radius: 5px;
  margin-left: 20px;
  cursor: pointer;

  &:hover {
    background-color: #133341;
  }
`;

export default SearchNavigation;
