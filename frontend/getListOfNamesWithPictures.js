/**
 * Helper function that takes in records and returns an array with the names and picture URLs of the attachment field.
 * @param {Object} param
 * @param {Array<Record>} param.records - The records.
 * @param {Field} param.attachmentField - The attachment field.
 * @param {Field} param.nameField - The name field.
 * @return {Array<{recordId: string, name: string, largePictureUrl: string, smallPictureUrl: string}>} - A list of names with pictures.
 */
export default function getListOfNamesWithPictures({records,  questField, opt1FieldId , opt2FieldId,  opt3FieldId,  opt4FieldId,  ansFieldId}) {
    const listOfNamesWithPictures = [];

    for (const record of records) {
        // const attachmentCellValue = record.getCellValue(attachmentField);

        // let attachmentObj;
        // if (attachmentCellValue && attachmentCellValue.length > 0) {
        //     // Try to get the first attachment object from the cell value.
        //     attachmentObj = attachmentCellValue[attachmentCellValue.length - 1];
        // }

        // if (
        //     !attachmentObj ||
        //     !attachmentObj.thumbnails ||
        //     !attachmentObj.thumbnails.large ||
        //     !attachmentObj.thumbnails.small
        // ) {
        //     // If there are no attachment present, continue without it.
        //     continue;
        // }

        const question = record.getCellValueAsString(questField);

        if (question.trim() === '') {
            // If there is no useful name, continue without it.
            continue;
        }
        const opt1 = record.getCellValueAsString(opt1FieldId);
        const opt2 = record.getCellValueAsString(opt2FieldId);
        const opt3 = record.getCellValueAsString(opt3FieldId);
        const opt4 = record.getCellValueAsString(opt4FieldId);
        const answer = record.getCellValueAsString(ansFieldId);
     
     

        listOfNamesWithPictures.push({
            recordId: record.id,
            question,
            opt1,
            opt2,
            opt3,
            opt4,
            answer
          
        });
    }

    return listOfNamesWithPictures;
}
