import React, { Fragment, useState, useEffect } from 'react';
import { Header, Grid, Image } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import PhotoWidgetDropzone from './PhotoWidgetDropZone'
import PhotoWidgetCropper from './PhotoWidgetCropper';

const PhotoUploadWidget = () => {
  const [files, setFiles] = useState<any[]>([]);
  const [image, setImage] = useState<Blob | null>(null);

  // Unmount the photo object added via drag'n'drop in PhotoWidgetDropZone
  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  })

  return (
    <Fragment>
      <Grid>
        {/* SECTION ONE - Drop Selected Photo */}
        <Grid.Column width={4}>
          <Header color='teal' sub content='Step 1 - Add Photo' />  
        <PhotoWidgetDropzone setFiles={setFiles} />        
        </Grid.Column>

        {/* SECTION TWO - Resize Photo*/}
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color='teal' content='Step 2 - Resize image' />
          {files.length > 0 && (
            <PhotoWidgetCropper
              setImage={setImage}
              imagePreview={files[0].preview}
            />
          )}
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>

        {/* SECTION THREE - Preview Image */}
          <Header sub color='teal' content='Step 3 - Preview & Upload' />
          {files.length > 0 && <Image src={files[0].preview} /> }
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(PhotoUploadWidget);






        //   {files.length > 0 && (
        //     <Fragment>
        //       <div
        //         className='img-preview'
        //         style={{ minHeight: '200px', overflow: 'hidden' }}
        //       />
        //       <Button.Group widths={2}>
        //         <Button
        //           positive
        //           icon='check'
        //         />
        //         <Button
        //           icon='close'                
        //           onClick={() => setFiles([])}
        //         />
        //       </Button.Group>
        //     </Fragment>
        //   )}