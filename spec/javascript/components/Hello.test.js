import Hello from "../../../app/javascript/components/Hello";
import {render} from "@testing-library/react";
import "@testing-library/jest-dom";

it('greets candidate name', () => {
    const component = render(<Hello candidate={"John"}/>)
    expect(component.getByText('Olá, John!')).toBeInTheDocument();
});