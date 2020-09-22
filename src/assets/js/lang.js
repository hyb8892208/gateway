function get_language() {
    let lang = _language;

    let new_lang = {
        el: {
            colorpicker: {
                confirm: lang.colorpicker_confirm == undefined ? 'OK' : lang.colorpicker_confirm,
                clear: lang.colorpicker_clear == undefined ? 'Clear' : lang.colorpicker_clear
            },
            datepicker: {
                now: lang.now == undefined ? 'Now' : lang.now,
                today: lang.today == undefined ? 'Today' : lang.today,
                cancel: lang.datepicker_cancel == undefined ? 'Cancel' : lang.datepicker_cancel,
                clear: lang.clear == undefined ? 'Clear' : lang.clear,
                confirm: lang.datepicker_confirm == undefined ? 'OK' : lang.datepicker_confirm,
                selectDate: lang.selectDate == undefined ? 'Select date' : lang.selectDate,
                selectTime: lang.selectTime == undefined ? 'Select time' : lang.selectTime,
                startDate: lang.startDate == undefined ? 'Start Date' : lang.startDate,
                startTime: lang.startTime == undefined ? 'Start Time' : lang.startTime,
                endDate: lang.endDate == undefined ? 'End Date' : lang.endDate,
                endTime: lang.endTime == undefined ? 'End Time' : lang.endTime,
                prevYear: lang.prevYear == undefined ? 'Previous Year' : lang.prevYear,
                nextYear: lang.nextYear == undefined ? 'Next Year' : lang.nextYear,
                prevMonth: lang.prevMonth == undefined ? 'Previous Month' : lang.prevMonth,
                nextMonth: lang.nextMonth == undefined ? 'Next Month' : lang.nextMonth,
                year: lang.year == undefined ? 'Year' : lang.year,
                month1: lang.month1 == undefined ? 'January' : lang.month1,
                month2: lang.month2 == undefined ? 'February' : lang.month2,
                month3: lang.month3 == undefined ? 'March' : lang.month3,
                month4: lang.month4 == undefined ? 'April' : lang.month4,
                month5: lang.month5 == undefined ? 'May' : lang.month5,
                month6: lang.month6 == undefined ? 'June' : lang.month6,
                month7: lang.month7 == undefined ? 'July' : lang.month7,
                month8: lang.month8 == undefined ? 'August' : lang.month8,
                month9: lang.month9 == undefined ? 'September' : lang.month9,
                month10: lang.month10 == undefined ? 'October' : lang.month10,
                month11: lang.month11 == undefined ? 'November' : lang.month11,
                month12: lang.month12 == undefined ? 'December' : lang.month12,
                week: lang.week == undefined ? 'week' : lang.week,
                weeks: {
                    sun: lang.sun == undefined ? 'Sun' : lang.sun,
                    mon: lang.mon == undefined ? 'Mon' : lang.mon,
                    tue: lang.tue == undefined ? 'Tue' : lang.tue,
                    wed: lang.wed == undefined ? 'Wed' : lang.wed,
                    thu: lang.thu == undefined ? 'Thu' : lang.thu,
                    fri: lang.fri == undefined ? 'Fri' : lang.fri,
                    sat: lang.sat == undefined ? 'Sat' : lang.sat
                },
                months: {
                    jan: lang.jan == undefined ? 'Jan' : lang.jan,
                    feb: lang.feb == undefined ? 'Feb' : lang.feb,
                    mar: lang.mar == undefined ? 'Mar' : lang.mar,
                    apr: lang.apr == undefined ? 'Apr' : lang.apr,
                    may: lang.may == undefined ? 'May' : lang.may,
                    jun: lang.jun == undefined ? 'Jun' : lang.jun,
                    jul: lang.jul == undefined ? 'Jul' : lang.jul,
                    aug: lang.aug == undefined ? 'Aug' : lang.aug,
                    sep: lang.sep == undefined ? 'Sep' : lang.sep,
                    oct: lang.oct == undefined ? 'Oct' : lang.oct,
                    nov: lang.nov == undefined ? 'Nov' : lang.nov,
                    dec: lang.dec == undefined ? 'Dec' : lang.dec
                }
            },
            select: {
                loading: lang.select_loading == undefined ? 'Loading' : lang.select_loading,
                noMatch: lang.select_noMatch == undefined ? 'No matching data' : lang.select_noMatch,
                noData: lang.select_noData == undefined ? 'No data' : lang.select_noData,
                placeholder: lang.select_placeholder == undefined ? 'Select' : lang.select_placeholder
            },
            cascader: {
                noMatch: lang.cascader_noMatch == undefined ? 'No matching data' : lang.cascader_noMatch,
                loading: lang.cascader_loading == undefined ? 'Loading' : lang.cascader_loading,
                placeholder: lang.cascader_placeholder == undefined ? 'Select' : lang.cascader_placeholder,
                noData: lang.cascader_noData == undefined ? 'No data' : lang.cascader_noData
            },
            pagination: {
                goto: lang.goto == undefined ? 'Go to' : lang.goto,
                pagesize: lang.pagesize == undefined ? '/page' : lang.pagesize,
                total: lang.total == undefined ? 'Total {total}' : lang.total,
                pageClassifier: lang.pageClassifier == undefined ? '' : lang.pageClassifier
            },
            messagebox: {
                title: lang.messagebox_title == undefined ? 'Message' : lang.messagebox_title,
                confirm: lang.messagebox_confirm == undefined ? 'OK' : lang.messagebox_confirm,
                cancel: lang.messagebox_cancel == undefined ? 'Cancel' : lang.messagebox_cancel,
                error: lang.messagebox_error == undefined ? 'Illegal input' : lang.messagebox_error
            },
            upload: {
                deleteTip: lang.deleteTip == undefined ? 'press delete to remove' : lang.deleteTip,
                delete: lang.delete == undefined ? 'Delete' : lang.delete,
                preview: lang.preview == undefined ? 'Preview' : lang.preview,
                continue: lang.continue == undefined ? 'Continue' : lang.continue
            },
            table: {
                emptyText: lang.table_emptyText == undefined ? 'No Data' : lang.table_emptyText,
                confirmFilter: lang.confirmFilter == undefined ? 'Confirm' : lang.confirmFilter,
                resetFilter: lang.resetFilter == undefined ? 'Reset' : lang.resetFilter,
                clearFilter: lang.clearFilter == undefined ? 'All' : lang.clearFilter,
                sumText: lang.sumText == undefined ? 'Sum' : lang.sumText
            },
            tree: {
                emptyText: lang.tree_emptyText == undefined ? 'No Data' : lang.tree_emptyText
            },
            transfer: {
                noMatch: lang.transfer_noMatch == undefined ? 'No matching data' : lang.transfer_noMatch,
                noData: lang.transfer_noData == undefined ? 'No data' : lang.transfer_noData,
                titles: lang.titles == undefined ? "['List 1', 'List 2']" : lang.titles,
                filterPlaceholder: lang.filterPlaceholder == undefined ? 'Enter keyword' : lang.filterPlaceholder,
                noCheckedFormat: lang.noCheckedFormat == undefined ? '{total} items' : lang.noCheckedFormat,
                hasCheckedFormat: lang.hasCheckedFormat == undefined ? '{checked}/{total} checked' : lang.hasCheckedFormat
            },
            image: {
                error: lang.error == undefined ? 'FAILED' : lang.error
            },
            pageHeader: {
                title: lang.title == undefined ? 'Back' : lang.title
            },
            popconfirm: {
                confirmButtonText: lang.confirmButtonText == undefined ? 'Yes' : lang.confirmButtonText,
                cancelButtonText: lang.cancelButtonText == undefined ? 'No' : lang.cancelButtonText
            },
            custom: lang
        }
    }

    return new_lang
}

export {
    get_language
}