var eventBus = new Vue();

Vue.component('product', {
    template: `
        <div class="product">
            <div class="product-image">
                <img :src="image">
            </div>

            <div class="product-info">
                <h1>{{ title }}</h1>
                <p v-if="inStock">In stock</p>
                <p v-else :class="{ lineThrough: !inStock }">Out of stock</p>

                <p v-if="onSale">On sale!</p>
                <p>Shipping: {{ shipping }}</p>

                <a :href="link">More info</a>
                
                <productDetails :details="details"></productDetails>

                <p>Available sizes: </p>
                <ul>
                    <li v-for="size in sizes">{{ size }}</li>
                </ul>

                <p>Variants:</p>
                
                    <div v-for="(variant, index) in variants" 
                    :key="variant.variantId" 
                    class="color-box" 
                    :style="{ backgroundColor: variant.variantColor }"
                    @mouseover="updateImage(index)">
                    </div>
                
                <button v-on:click="addToCart" :disabled="!inStock" :class="{ disabledButton: !inStock }">Add to cart</button>
                <button v-on:click="removeFromCart">Remove from cart</button>
            </div>

            <product-tabs :reviews="reviews" :shipping="shipping" :details="details"></product-tabs>
        </div>
    `,
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            selectedVariant: 0,
            link: '#',
            onSale: true,
            details: ['80% cotton', '20% polyester', 'Gender-neutral'],
            sizes: ['Small', 'Medium', 'Large'],
            variants: [
                {
                    variantId: 0,
                    variantColor: "green",
                    variantImage: './assets/vmSocks-green-onWhite.jpg',
                    variantQuantity: 10,
                },
                {
                    variantId: 1,
                    variantColor: "blue",
                    variantImage: './assets/vmSocks-blue-onWhite.jpg',
                    variantQuantity: 2,
                }
            ],
            reviews: []
        }
    },
    methods: {
        addToCart: function() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        removeFromCart: function() {
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].variantId);
        },
        updateImage: function(index) {
            this.selectedVariant = index;
        },
    },
    computed: {
        title(){
            return this.brand + " " + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity > 0;
        },
        shipping() {
            return this.premium ? 'Free' : '2.99';
        }
    },
    mounted(){
        eventBus.$on('review-submit', productReview => this.reviews.push(productReview));
    }
})

Vue.component('productDetails', {
    template: `
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    `,
    props: {
        details: Array,
        required: true,
        default: []
    }
})

Vue.component('product-review', {
    template: `
        <form class="review-form" @submit.prevent="onSubmit">
            <p v-if="errors.length > 0">
                Please correct the following errors:
                <ul>
                    <li v-for="error in errors">{{ error }}</li>
                </ul>
            </p>

            <p>
                <label for="name">Name:</label>
                <input id="name" v-model="name" placeholder="name">
            </p>
            
            <p>
                <label for="review">Review:</label>      
                <textarea id="review" v-model="review"></textarea>
            </p>
            
            <p>
                <label for="rating">Rating:</label>
                <select id="rating" v-model.number="rating">
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                </select>
            </p>

            <p>
                Would you recommend this product?
            </p>

            <input type="radio" id="yes" name="recommend" value="yes" v-model="would_recommend">
            <label for="yes">Yes</label>
            <input type="radio" id="no" name="recommend" value="no" v-model="would_recommend">
            <label for="no">No</label>
            
            <p>
                <input type="submit" value="Submit">  
            </p>    
        </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: [],
            would_recommend: null,
        }
    },
    methods: {
        onSubmit() {
            if(this.name && this.review && this.rating && this.would_recommend){
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    would_recommend: this.would_recommend
                }
                eventBus.$emit('review-submit', productReview);
                this.name = null;
                this.review = null;
                this.rating = null;
            } else {
                this.errors = [];
                if(!this.name) this.errors.push('A name is required');
                if(!this.review) this.errors.push('A review is required');
                if(!this.rating) this.errors.push('A rating is required');
                if(!this.would_recommend) this.errors.push('Please select a recommendation option')
            }
        }
    }
})

Vue.component('product-tabs', {
    template: `
        <div>
            <span 
                class="tab"
                :class="{ activeTab: selectedTab === tab }"
                v-for="(tab, index) in tabs" 
                :key="index" 
                @click="selectedTab = tab">
                {{ tab }}
            </span>

            <div v-show="selectedTab === 'Reviews'">
                <h2>Reviews</h2>
                <p v-if="reviews.length == 0">There are no reviews yet.</p>
                <ul v-else>
                    <li v-for="review in reviews">
                        <p>{{ review.name }}</p>
                        <p>Review: {{ review.review }}</p>
                        <p>Rating: {{ review.rating }}</p>
                        <p>Would recommend: {{ review.would_recommend }}</p>
                    </li>
                </ul>
            </div>

            <product-review v-show="selectedTab === 'Make a review'"></product-review>

            <p v-show="selectedTab === 'Shipping'">Shipping: {{ shipping }}</p>

            <productDetails v-show="selectedTab === 'Details'" :details="details"></productDetails>
        </div>
    `,
    props: {
        reviews: {
            type: Array,
            required: true,
            default: []
        },
        shipping: {
            type: String,
            required: true,
            default: null
        },
        details: {
            type: Array,
            required: true,
            default: []
        }
    },
    data() {
        return {
            tabs: ['Reviews', 'Make a review', 'Shipping', 'Details'],
            selectedTab: 'Reviews'
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: []
    },
    methods: {
        addToCart: function(id) {
            this.cart.push(id)
        },
        removeFromCart: function(id) {
            this.cart = this.cart.filter(product_id => product_id !== id)
        },
    }
})