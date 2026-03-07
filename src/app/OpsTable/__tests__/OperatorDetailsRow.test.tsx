import { Table, TableBody } from '@mui/material';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OperatorDetailsRow from '../OperatorDetailsRow';
import { STORAGE_KEY } from '../checkInStorage';
import { OpsDataType } from '../helper';

const MockOperators = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    fullName: 'John Doe',
    opsCompleted: 15,
    reliability: 95,
    endorsements: ['Forklift', 'Safety'],
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    fullName: 'Jane Smith',
    opsCompleted: 22,
    reliability: 88,
    endorsements: ['Electrical'],
  },
] as OpsDataType['operators'];


function renderWithTable(Component: React.ReactElement) {
  return render(
    <Table>
      <TableBody>{Component}</TableBody>
    </Table>
  );
}


beforeEach(() => {
  localStorage.clear();
});


describe('OperatorDetailsRow', () => {
  it('does not render content when open is false', () => {
    renderWithTable(
      <OperatorDetailsRow operators={MockOperators} open={false} opPublicId="OP-123" />
    );
    expect(screen.queryByText('OPERATORS')).not.toBeInTheDocument();
    expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
  });


  it('renders operator table headers when open is true', () => {
    const tableHeaders = ['Full Name', 'Ops Completed', 'Reliability', 'Endorsements', 'Status'];
    renderWithTable(
      <OperatorDetailsRow operators={MockOperators} open={true} opPublicId="OP-123" />
    );

    tableHeaders.forEach((header:string) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    })
  });


  it('renders operator data correctly', () => {
    const tableData = ['John Doe', 'Jane Smith', '15', '22', '95%', '88%', 'Forklift, Safety', 'Electrical'];
    renderWithTable(
      <OperatorDetailsRow operators={MockOperators} open={true} opPublicId="OP-123" />
    );

    tableData.forEach((data:string) => {
      expect(screen.getByText(data)).toBeInTheDocument();
    });
  });





  it('loads initial check-in state from localStorage', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ '1_OP-123': true }));

    renderWithTable(
      <OperatorDetailsRow operators={MockOperators} open={true} opPublicId="OP-123" />
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveTextContent('Check Out');
    expect(buttons[1]).toHaveTextContent('Check In');
  });


  it('toggles Check In to Check Out on click', async () => {
    const user = userEvent.setup();

    renderWithTable(
      <OperatorDetailsRow operators={MockOperators} open={true} opPublicId="OP-123" />
    );

    const checkInButtons = screen.getAllByText('Check In');
    await user.click(checkInButtons[0]);

    expect(checkInButtons[0]).toHaveTextContent('Check Out');

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(stored['1_OP-123']).toBe(true);
  });


  it('toggles Check Out back to Check In on click', async () => {
    const user = userEvent.setup();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ '1_OP-123': true }));

    renderWithTable(
      <OperatorDetailsRow operators={MockOperators} open={true} opPublicId="OP-123" />
    );

    const checkOutButton = screen.getByText('Check Out');
    await user.click(checkOutButton);

    expect(checkOutButton).toHaveTextContent('Check In');

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(stored['1_OP-123']).toBe(false);
  });
});
