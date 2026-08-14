/**
 * 通用配置信息
 */
export default {
    // 小票设计器配置
    receiptDesigner: {
        // 自动补全代码提示
        autocomplete: {
            // 文本类输入框
            text: [
                'merchant_no',
                'merchant_name',
                'store_no',
                'store_name',
                'store_address',
                'timezone',
                'trans_no',
                'orig_trans_no',
                'merchant_order_no',
                'pay_channel_trans_no',
                'trans_amount',
                'paid_amount',
                'total_discount',
                'app_name',
                'price_currency',
                'terminal_sn',
                'trans_status_name',
                'trans_type_name',
                'pay_user_account_id',
                'pay_method_name',
                'sub_pay_method_name',
                'sub_pay_method_icon_url',
                'trans_end_time',
                'description',
                'batch_no',
                'voucher_no',
                'ref_no',
                'auth_no',
                'sys_no',
                'pay_channel_merchant_no',
                'timezone',
                'pay_channel_terminal_no',
                'pay_scenario',
            ],
            // 图片类输入框
            image: ['merchant_logo', 'pay_method_icon_url', 'receipt_print_logo'],
            // 二维码类输入框
            qrcode: ['trans_no'],
            // 条码类输入框
            barcode: ['trans_no'],
        },
        // 扩展字体
        extFonts: [
            {
                name: 'NotoSansMono_ExtraCondensed-SemiBold',
                font: 'NotoSansMono_ExtraCondensed-SemiBold',
                path: '/fonts/NotoSansMono_ExtraCondensed-SemiBold.ttf',
            },
            {
                name: 'NotoSansMono_SemiCondensed-Medium',
                font: 'NotoSansMono_SemiCondensed-Medium',
                path: '/fonts/NotoSansMono_SemiCondensed-Medium.ttf',
            },
        ],
    },
    // Checkout相关配置
    checkout: {
        supportedLayouts: [
            {
                id: 'default',
                name: 'Default',
            },
        ],
    },
};
