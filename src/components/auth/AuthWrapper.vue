<template>
    <div
        class="vpb-auth-wrapper"
        :class="`${reverse ? 'vpb-auth-wrapper--reverse' : ''}`"
    >
        <div class="vpb-auth-img">
            <img
                class="vpb-auth-img--logo"
                src="images/vp-logo.png"
                srcset="images/vp-logo.png 2x"
                alt="Logo"
            />
            <img
                class="vpb-auth-img--full"
                :srcset="`${img} 2x`"
                alt="VPBank"
            />
        </div>
        <div class="vpb-auth-content">
            <div class="vpb-auth-main">
                <div class="vpb-auth-main--container">
                    <div class="vpb-auth-logo">
                        <img srcset="images/vp-logo.png 2x" alt="Logo" />
                    </div>

                    <h1 class="vpb-auth-title">{{ $t(title) }}</h1>

                    <slot></slot>
                </div>
            </div>

            <div class="vpb-auth-footer">
                <span class="vpb-auth-footer--license">
                    {{ $t(wrapperData.license) }}
                </span>

                <div class="vpb-auth-footer--locale">
                    <span
                        class="cursor-pointer"
                        :class="
                            commonStore.locale === 'vi'
                                ? 'text-weight-bold'
                                : ''
                        "
                        @click="setLocale('vi')"
                    >
                        Tiếng Việt
                    </span>
                    <img src="/icons/ellipse.svg" alt="Dot" />
                    <span
                        class="cursor-pointer"
                        :class="
                            commonStore.locale === 'en-US'
                                ? 'text-weight-bold'
                                : ''
                        "
                        @click="setLocale('en-US')"
                    >
                        English
                    </span>
                </div>
            </div>

            <img
                class="vpb-auth-bg--shape-1"
                alt="Background 1"
                srcset="images/vp-shape-1.png 2x"
            />
            <img
                class="vpb-auth-bg--shape-2"
                alt="Background 2"
                srcset="images/vp-shape-2.png 2x"
            />
            <img
                class="vpb-auth-bg--shape-3"
                alt="Background 3"
                srcset="images/vp-shape-3.png 2x"
            />
            <img
                class="vpb-auth-bg--shape-4"
                alt="Background 4"
                srcset="images/vp-shape-4.png 2x"
            />
        </div>
    </div>
</template>

<script>
import useMultipleLanguage from "src/composables/commons/useMultipleLanguage";

export default {
    name: "AuthWrapper",
    props: {
        img: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        reverse: {
            type: Boolean,
            default: false,
        },
    },
    setup() {
        const { commonStore, setLocale } = useMultipleLanguage();

        const wrapperData = {
            license: "auth.license",
        };

        return {
            wrapperData,
            setLocale,
            commonStore,
        };
    },
};
</script>
