import { FormEvent, useState } from 'react';
import { Form, Button, notification } from 'antd';

import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const AppAgreementForm = ({ agreement }: { agreement: string }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [editorState, setEditorState] = useState<string>();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleEditorState = (v: string) => {
    setEditorState(v);
  };

  const onFinish = async () => {
    try {
      /* setLoading(true);
      const res = await UpdateAgreementMutation({
        variables: {
          input: {
            agreement: editorState,
          },
        },
      });
      if (res) {
        notification.success({
          message: `تم الحفظ بنجاح`,
          description: `تم تحديث إتفاقية الإستخدام بنجاح`,
        });
      } */
    } catch (error) {
      console.error(error);
      notification.error({
        message: `حدث خطأ`,
        description: `حدث خطأ غير متوقع يرجى إعادة المحاولة`,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 style={{ padding: '1em' }}>تعديل محتوى إتفاقية الإستخدام</h2>
      <Form
        wrapperCol={{ span: 18 }}
        form={form}
        size="large"
        layout="vertical"
        scrollToFirstError
        onFinish={onFinish}
        onSubmitCapture={onSubmit}
      >
        <Form.Item label="المحتوى" required name="agreement">
          <SunEditor
            onChange={handleEditorState}
            autoFocus
            height="500px"
            setOptions={{
              buttonList: [
                ['undo', 'redo'],
                ['preview', 'print'],
                ['fullScreen', 'showBlocks', 'codeView'],
                ['paragraphStyle', 'blockquote'],
                ['fontColor', 'hiliteColor', 'textStyle'],
                ['removeFormat'],
                ['outdent', 'indent'],
                ['align', 'horizontalRule', 'list', 'lineHeight'],
                ['bold', 'underline', 'italic'],
                ['font', 'fontSize', 'formatBlock'],
              ],
              // plugins: [font] set plugins, all plugins are set by default
              rtl: true,
              formats: [
                'p',
                'div',
                'blockquote',
                'pre',
                'h1',
                'h2',
                'h3',
                'h4',
                'h5',
                'h6',
                // "blockquote": range format, "pre": free format, "Other tags": replace format
              ],
            }}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          style={{ width: '150px' }}
          loading={loading}
        >
          حفظ
        </Button>
      </Form>
    </>
  );
};

export default AppAgreementForm;
