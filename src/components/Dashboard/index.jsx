import styled from "styled-components";
import useLogout from "../../apis/usePostLogout";


const tests = [];

function Dashboard() {
  const fetchLogout = useLogout();

  return (
    <>
      <Header>
        <Logo src="/assets/uxplorer_text.png" alt="Logo" />
        <LogoutButton onClick={() => fetchLogout()}>로그아웃</LogoutButton>
      </Header>
      <Nav>
        <SearchContainer>
          <Icon>🔍</Icon>
          <SearchInput type="text" placeholder="테스트 이름을 입력해주세요." />
          <SearchButton>검색</SearchButton>
        </SearchContainer>
        <NewTestButton>+ 새 테스트</NewTestButton>
      </Nav>
      <TestsContainer>
        {tests.length > 0 ? (
          tests.map((test) => (
            <TestCard key={test.id}>
              <h3>{test.name}</h3>
              <p>{test.url}</p>
              <p>{test.headCount}</p>
              <p>{test.completedAt}</p>
              <p>{test.isProgressing}</p>
            </TestCard>
          ))
        ) : (
          <NoTestsMessage>테스트 목록이 비어있습니다.</NoTestsMessage>
        )}
      </TestsContainer>
    </>
  );
}

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
`;

const Logo = styled.img`
  height: 50px;
`;

const LogoutButton = styled.button`
  padding: 10px 20px;
  background-color: #355e70;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  height: 50px;
  cursor: pointer;

  &:hover {
    background-color: #133341;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2em 2em;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
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

const TestsContainer = styled.div`
  padding: 4em 15em;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4em;
`;

const TestCard = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const NoTestsMessage = styled.p`
  text-align: center;
  color: #999;
`;

export default Dashboard;
