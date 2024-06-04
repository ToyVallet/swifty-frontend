import Home from "@/app/page";
import "@testing-library/jest-dom";
import {render, screen } from "@testing-library/react";

test("홈 화면의 button이 렌더링 된다", () => {
    //given
    render(<Home/>);
    //when
    const button = screen.getByRole('button');
    // then
    expect(button).toBeInTheDocument();
});
