'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@swifty/ui';
import { ChevronDown } from 'lucide-react';

export default function FooterDrawer() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          (주)스위프트코퍼레이션 사업자등록 정보
          <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </AccordionTrigger>
        <AccordionContent>
          <p className="text-[10px] whitespace-pre-line leading-[15px] dark:text-swifty-color-300 text-swifty-color-600 ">
            주식회사 스위프티코퍼레이션 대표이사 강우주
            <br />
            경기도 화성시 동탄중심상가2길 8,6층(반송동)
            <br />
            사업자등록번호 436-86-02915 &#91;
            <a
              href="http://www.ftc.go.kr/bizCommPop.do?wrkr_no=4368602915"
              className="underline underline-offset-2"
              target="_blank"
            >
              사업자정보 확인
            </a>
            &#93;
            <br />
            통신판매신고번호
            <br />
            <br />
            고객센터
            <br />
            <a href="mailto:info@feasta.kr">이메일 info@feasta.kr</a>
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
